document.addEventListener("DOMContentLoaded", function () {
  const socket = io();
  const logContainer = document.getElementById("log-container");
  socket.on("log", (message) => {
    const messageP = document.createElement("code");
    messageP.innerHTML = `${message}<br/>`;
    logContainer.appendChild(messageP);
    console.log("message", message);
    logContainer.scrollTop = logContainer.scrollHeight;
  });

  function sendToggleRequest(action, port) {
    const requestData = {
      action,
      port,
    };
    console.log("requestData", requestData);
    fetch("/api/proxy", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const message = data.message;
        const error = data.error;
        const messageP = document.createElement("p");
        if (error) {
          messageP.textContent = error;
          messageP.style.color = "red";
          logContainer.appendChild(messageP);
        } else if (message) {
          messageP.textContent = message;
          logContainer.appendChild(messageP);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        const messageP = document.createElement("p");
        messageP.textContent = error.message;
        messageP.style.color = "red";
        if (error.message) {
          logContainer.appendChild(messageP);
        }
      });
  }
  const portInput = document.getElementById("portInput");
  const proxyURL = document.getElementById("proxyUrl");
  function updateDisplayedUrl() {
    // Get the current URL
    const currentUrl = window.location.href;

    // Extract the host and port from the current URL
    const urlParts = new URL(currentUrl);
    const host = urlParts.hostname;
    const port = portInput.value || "8080"; // Use the input value or "xyz" if empty

    // Create a new URL with the modified port
    const modifiedUrl = `<strong>Use proxy URL ==> </strong> <a href="">https://${host}:${port}/</a>`;

    // Display the modified URL in the HTML element
    proxyURL.innerHTML = modifiedUrl;
  }
  portInput.addEventListener("change", updateDisplayedUrl);
  updateDisplayedUrl();

  // Event handlers for the buttons
  document.getElementById("startBtn").addEventListener("click", () => {
    console.log("logggg");
    const port = document.getElementById("portInput").value;
    sendToggleRequest("start", port);
  });

  document.getElementById("stopBtn").addEventListener("click", () => {
    const port = document.getElementById("portInput").value;
    sendToggleRequest("stop", port);
  });

  document.getElementById("rerunBtn").addEventListener("click", () => {
    const port = document.getElementById("portInput").value;
    sendToggleRequest("rerun", port);
  });
});
