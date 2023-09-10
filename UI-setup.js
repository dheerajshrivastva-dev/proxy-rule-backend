let rulesArray = [];
document.addEventListener("DOMContentLoaded", function () {
  loadRules(updateRulesList);
  const addRuleBtn = document.getElementById("addRuleBtn");
  const submitRulesBtn = document.getElementById("submitRulesBtn");
  const domainRulesList = document.getElementById("domainRulesList");
  const submittedRules = document.getElementById("submittedRules");
  // edit
  const editPopup = document.getElementById("editPopup");
  const editForm = document.getElementById("editForm");
  const saveEditBtn = document.getElementById("saveEditBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const cancelEditPopup = document.getElementById("cancelEditPopup");

  const toggleRuleFormBtn = document.getElementById("toggleRuleFormBtn");
  const ruleForm = document.getElementById("ruleForm");

  const addButtonText = `<span class="material-symbols-outlined">add</span>Add Domain Rule`;
  const closeButtonText = `<span class="material-symbols-outlined">close</span>Close`;

  // Initial button text
  toggleRuleFormBtn.innerHTML = ruleForm.classList.contains("show")
    ? closeButtonText
    : addButtonText;

  // Update button text when the form state changes
  ruleForm.addEventListener("shown.bs.collapse", function () {
    toggleRuleFormBtn.innerHTML = closeButtonText;
    toggleRuleFormBtn.classList.add("btn-danger");
  });

  ruleForm.addEventListener("hidden.bs.collapse", function () {
    toggleRuleFormBtn.innerHTML = addButtonText;
    toggleRuleFormBtn.classList.remove("btn-danger");
  });

  addRuleBtn.addEventListener("click", function () {
    const ruleObject = {
      rule: {
        perSecondRule: document.getElementById("perSecondRule").checked,
        perMinuteRule: document.getElementById("perMinuteRule").checked,
        perHourRule: document.getElementById("perHourRule").checked,
        perDayRule: document.getElementById("perDayRule").checked,
        maxAmountPerDay:
          parseFloat(document.getElementById("maxAmountPerDay").value) || 0,
        maxFreeRequestsPerDay:
          parseInt(document.getElementById("maxFreeRequestsPerDay").value) || 0,
        maxFreeRequestsPerMinute:
          parseInt(document.getElementById("maxFreeRequestsPerMinute").value) ||
          0,
        costPerRequest:
          parseFloat(document.getElementById("costPerRequest").value) || 0,
      },
      domain: document.getElementById("domain").value || "undefined",
    };
    rulesArray.push(ruleObject);
    updateRulesList();
  });

  // Edit button click handler
  const container2 = document.getElementById("container2");
  function openEditPopup(index) {
    editPopup.style.display = "flex";
    const rule = rulesArray[index];
    // Populate the edit form with rule data
    document.getElementById("editDomain").value = rule.domain;
    document.getElementById("editPerSecondRule").checked =
      rule.rule.perSecondRule;
    document.getElementById("editPerMinuteRule").checked =
      rule.rule.perMinuteRule;
    document.getElementById("editPerHourRule").checked = rule.rule.perHourRule;
    document.getElementById("editPerDayRule").checked = rule.rule.perDayRule;
    document.getElementById("editMaxAmountPerDay").value =
      rule.rule.maxAmountPerDay;
    document.getElementById("editMaxFreeRequestsPerDay").value =
      rule.rule.maxFreeRequestsPerDay;
    document.getElementById("editMaxFreeRequestsPerMinute").value =
      rule.rule.maxFreeRequestsPerMinute;
    document.getElementById("editCostPerRequest").value =
      rule.rule.costPerRequest;

    saveEditBtn.setAttribute("data-index", index);
    container2.scrollTop = 0;
  }
  function deleteItem(index) {
    console.log("jjhjhj", index);
    const rule = rulesArray[index];
    window.alert(
      `Rule is deleted \n${JSON.stringify(
        rule
      )} \n\nNot forget to submit the rule after editing!`
    );
    rulesArray = rulesArray.filter((_, i) => i !== index);
    updateRulesList();
  }
  // Save edit button click handler
  saveEditBtn.addEventListener("click", function () {
    const editedIndex = parseInt(saveEditBtn.getAttribute("data-index"));
    const editedRule = {
      domain: document.getElementById("editDomain").value || "undefined",
      rule: {
        perSecondRule: document.getElementById("editPerSecondRule").checked,
        perMinuteRule: document.getElementById("editPerMinuteRule").checked,
        perHourRule: document.getElementById("editPerHourRule").checked,
        perDayRule: document.getElementById("editPerDayRule").checked,
        maxAmountPerDay:
          parseFloat(document.getElementById("editMaxAmountPerDay").value) || 0,
        maxFreeRequestsPerDay:
          parseInt(
            document.getElementById("editMaxFreeRequestsPerDay").value
          ) || 0,
        maxFreeRequestsPerMinute:
          parseInt(
            document.getElementById("editMaxFreeRequestsPerMinute").value
          ) || 0,
        costPerRequest:
          parseFloat(document.getElementById("editCostPerRequest").value) || 0,
      },
    };

    // Update the rule in the array
    rulesArray[editedIndex] = editedRule;

    // Update the displayed list of rules
    updateRulesList();

    // Close the edit popup
    editPopup.style.display = "none";
  });

  // Function to update the displayed list of rules
  function updateRulesList() {
    console.log("I am running", rulesArray);

    domainRulesList.innerHTML = "";
    rulesArray.forEach(function (rule, index) {
      const listItem = document.createElement("li");
      console.log("index source", index);
      listItem.classList.add("list-group-item");
      listItem.classList.add("border-info");
      listItem.innerHTML = `
            <strong>${rule.domain}</strong>
            <button class="btn btn-link edit-button" data-index="${index}"><span class="material-symbols-outlined">edit</span></button>
            <button class="btn btn-link delete-button" data-index="${index}"><span class="material-symbols-outlined">delete</span></button><br>
            Per Second: ${rule.rule.perSecondRule ? "Yes" : "No"}<br>
            Per Minute: ${rule.rule.perMinuteRule ? "Yes" : "No"}<br>
            Per Hour: ${rule.rule.perHourRule ? "Yes" : "No"}<br>
            Per Day: ${rule.rule.perDayRule ? "Yes" : "No"}<br>
            Max Amount Per Day: ${rule.rule.maxAmountPerDay}<br>
            Max Free Requests Per Day: ${rule.rule.maxFreeRequestsPerDay}<br>
            Max Free Requests Per Minute: ${
              rule.rule.maxFreeRequestsPerMinute
            }<br>
            Cost Per Request: ${rule.rule.costPerRequest}
          `;
      domainRulesList.appendChild(listItem);
      // Attach the event listener to the "Edit" button inside the list item
      const editButton = listItem.querySelector(".edit-button");
      editButton.addEventListener("click", function (event) {
        // const index = event.target.getAttribute("data-index");
        openEditPopup(index);
      });
      //
      const deleteButton = listItem.querySelector(".delete-button");
      deleteButton.addEventListener("click", function (event) {
        // const index = event.target.getAttribute("data-index");
        console.log(index, "index");
        deleteItem(index);
      });
    });
  }
  // Cancel edit button click handler
  cancelEditBtn.addEventListener("click", function () {
    editPopup.style.display = "none";
  });
  cancelEditPopup.addEventListener("click", function () {
    editPopup.style.display = "none";
  });
  submitRulesBtn.addEventListener("click", function () {
    submittedRules.textContent = "Updating...";
    // Make an AJAX POST request to update the rules
    fetch("/update-rules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformArrayToObject([...rulesArray])),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const formatter = new JSONFormatter(rulesArray, 2, { theme: 'dark' });
        // submittedRules.textContent = JSON.stringify(rulesArray, null, 2);
        submittedRules.textContent = "";
        submittedRules.appendChild(formatter.render())
        container2.scrollTop = container2.scrollHeight;
      })
      .catch((error) => {
        console.error("Error updating rules", error);
        submittedRules.textContent = JSON.stringify(error, null, 2);
      });
  });
});
// helpers
function transformArrayToObject(inputArray) {
  const transformedObject = {};

  inputArray.forEach((item) => {
    const domain = item.domain || "undefined";
    const rule = item.rule;

    transformedObject[domain] = {
      perSecondRule: rule.perSecondRule,
      perMinuteRule: rule.perMinuteRule,
      perHourRule: rule.perHourRule,
      perDayRule: rule.perDayRule,
      maxAmountPerDay: rule.maxAmountPerDay || 0,
      maxFreeRequestsPerDay: rule.maxFreeRequestsPerDay || 0,
      maxFreeRequestsPerMinute: rule.maxFreeRequestsPerMinute || 0,
      costPerRequest: rule.costPerRequest || 0,
    };
  });

  return transformedObject;
}

function transformObjectToArray(inputObject) {
  const transformedArray = [];

  for (const domain in inputObject) {
    console.log(domain);
    if (inputObject.hasOwnProperty(domain)) {
      const rule = inputObject[domain];
      transformedArray.push({
        domain: domain,
        rule: {
          perSecondRule: rule.perSecondRule,
          perMinuteRule: rule.perMinuteRule,
          perHourRule: rule.perHourRule,
          perDayRule: rule.perDayRule,
          maxAmountPerDay: rule.maxAmountPerDay || 0,
          maxFreeRequestsPerDay: rule.maxFreeRequestsPerDay || 0,
          maxFreeRequestsPerMinute: rule.maxFreeRequestsPerMinute || 0,
          costPerRequest: rule.costPerRequest || 0,
        },
      });
    }
  }
  console.log("transformedArray", transformedArray);
  return transformedArray;
}

function loadRules(success) {
  fetch("/rules") // Replace with your server URL
    .then((response) => response.json())
    .then((data) => {
      rulesArray = transformObjectToArray(data);
      console.log("data", rulesArray);
      success();
    })
    .catch((error) => {
      console.error("Error fetching rules from the server", error);
    });
}
document.getElementById("getConfig").addEventListener('click', getRules)

function getRules() {
  fetch("/rules") // Replace with your server URL
    .then((response) => response.json())
    .then((data) => {
      const serverRules = transformObjectToArray(data);
      const logContainer = document.getElementById("log-container");
      const formatter = new JSONFormatter(serverRules, 2, { theme: 'dark' });
      console.log("message", formatter.render());
      logContainer.appendChild(formatter.render());
      logContainer.scrollTop = logContainer.scrollHeight;
    })
    .catch((error) => {
      console.error("Error fetching rules from the server", error);
    });
}
