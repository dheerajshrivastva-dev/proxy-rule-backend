const { spawn } = require('child_process');
// const socketIO = require('socket.io-client');
// const socketIo = require('socket.io');

// Connect to the WebSocket server
// const socket = socketIO('https://127.0.0.1:3000');

// Declare the proxyProcess as a global variable
let proxyProcess;

// Function to start the proxy server
function startProxyServer(port=8080, socket) {
  console.log('port in', port);
  return new Promise((resolve, reject) => {
    // Implement the logic to start the proxy server here
    // For example, you can use child_process.spawn to run proxy.js
    // You might need to pass configuration data or command line arguments

    proxyProcess = spawn('node', ['./proxy.js', `--port=${port}`]);
    // console.log(proxyProcess);
    proxyProcess.stdout.on('data', (data) => {
      const logMessage = data.toString();
      console.log("kjhjghgghgfcgghjghj", data.toString());
      socket.emit('log', logMessage);
    });
    proxyProcess.on('error', (err) => {
      console.log("kjhjghgghgfcgghjghj");
      const errorMessage = err.message;
      socket.emit('log', `Proxy server error: ${errorMessage}`);
      reject(err);
    });
    proxyProcess.on('exit', (code) => {
      if (code === 0) {
        resolve('started'); // Proxy started successfully
        socket.emit('log', 'Proxy started successfully');
      } else {
        socket.emit('log', `Proxy server exited with code ${code}`);
        reject(`Proxy server exited with code ${code}`);
      }
    });
    
  });
}

// Function to stop the proxy server
function stopProxyServer(socket) {
  return new Promise(async (resolve, reject) => {
    if (!proxyProcess) {
      // Proxy is not running
      resolve('Proxy server is not running.');
      return;
    }

    try {
      await proxyProcess.kill('SIGTERM');
      const code = proxyProcess.exitCode;
      if (code === 0) {
        resolve('Proxy stopped successfully');
      } else {
        reject(`Proxy server exited with code ${code}`);
      }
    } catch (error) {
      reject(`Error stopping proxy server: ${error}`);
    }
  });
}
async function restartProxyServer(port, socket) {
  try {
    // Stop the current proxy server (if running)
    if (proxyProcess) {
      await stopProxyServer(socket);
    }

    // Start a new proxy server
    await startProxyServer(port, socket);

    console.log('Proxy server restarted successfully.');
  } catch (error) {
    console.error('Error restarting proxy server:', error);
  }
}

module.exports = { startProxyServer, stopProxyServer, proxyProcess, restartProxyServer };
