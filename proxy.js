const net = require("net");
const url = require("url");

// Redis Client Setup
const { createClient } = require("redis");
const RediSClient = createClient();

// Transparent proxy port
let proxyPort = 8080;

// Get the command-line arguments
const args = process.argv.slice(2);

// Loop through the arguments to find the --port argument
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--port" && i + 1 < args.length) {
    proxyPort = args[i + 1] || 8080;
    console.log(`Proxy server started on port ${proxyPort}`);
    // You can use the 'port' variable to configure your proxy server
    break;
  }
}
console.log("proxy port", proxyPort);
// Handle Redis client errors
RediSClient.on("error", (err) => console.log("Redis Client Error:", err));

// Connect to the Redis server (async)
(async () => {
  await RediSClient.connect();
})();

// Read configuration from files (config.json)
const configObject = require("./config.json");

// Color constants for console output
const red = "\x1b[31m";
const green = "\x1b[32m";
const reset = "\x1b[0m";

// Variables for logging statistics
let totalPass = 0;
let totalRejected = 0;

// Function to print text in red
const Reject = (data) => {
  console.log(`${red}${data}${reset}`);
};

// Function to print text in green
const Success = (data) => {
  console.log(`${green}${data}${reset}`);
};

// Create a TCP server to handle CONNECT requests (for HTTPS)
const proxyTcpServer = net.createServer((clientSocket) => {
  clientSocket.once("data", async (data) => {
    // Parse the CONNECT request
    const [_, target] = data.toString().split(" ");
    let pastDayCounter;

    // Parse the target URL
    const { hostname, port } = url.parse(`//${target}`, false, true);
    const domainRule = configObject[hostname] || null;
    const key = `hdomain:${hostname}`;

    try {
      // Increment the counter in Redis
      pastDayCounter = await RediSClient.ZINCRBY(key, 1, "one");
    } catch (e) {
      console.log("Error in SORTED SET", e);
    }

    if (domainRule && pastDayCounter >= domainRule.maxFreeRequestsPerDay) {
      // If the request exceeds the configured limit, reject it
      const response =
        `HTTP/1.1 429 Too Many Requests\r\n` +
        `X-RateLimit-Limit: ${domainRule.maxFreeRequestsPerDay}\r\n` +
        `X-RateLimit-Remaining: '0'\r\n` +
        `X-RateLimit-Reset: Tomorrow :)\r\n` +
        `X-Blocked-By-Proxy: 'true'\r\n\r\n` +
        "API limit exceeded for domain: " +
        hostname +
        ". Call count: " +
        pastDayCounter;

      // Write the custom response to the client socket
      clientSocket.write(response);
      Reject(
        `This call is being rejected for Domain: ${hostname} and call count is: ${pastDayCounter}`
      );
      clientSocket.end(); // Close the clientSocket
      totalRejected++;
      Reject(`TOTAL REJECTED ==> ${totalRejected}`);
      return;
    } else {
      // Establish a TCP connection to the target server
      const serverSocket = net.connect(port || 443, hostname, () => {
        // Respond to the client with a success message
        clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
        // Forward data between client and server
        clientSocket.pipe(serverSocket);
        serverSocket.pipe(clientSocket);
      });
      totalPass++;
      Success(`TOTAL Passed ==> ${totalPass}`);
      Success(
        `This call is Approved for Domain: ${hostname} and call count is: ${pastDayCounter}`
      );
      // Listen for serverSocket's 'end' event to close the connection after response
      serverSocket.on("end", () => {
        clientSocket.end(); // Close the clientSocket
      });
      serverSocket.on("error", (error) => {
        console.error("Error in serverSocket:", error);
        clientSocket.end(); // Close the clientSocket
      });
    }
  });

  // Handle errors on the clientSocket
  clientSocket.on("error", (error) => {
    console.error("Error in clientSocket:", error);
    clientSocket.end(); // Close the clientSocket
  });
});

// Handle errors on the proxyTcpServer
proxyTcpServer.on("error", (error) => {
  console.error("Error in proxyTcpServer:", error);
});

// Start the TCP proxy server on the specified port
proxyTcpServer.listen(proxyPort, () => {
  Success(`Transparent TCP proxy listening on port ${proxyPort}`);
});
