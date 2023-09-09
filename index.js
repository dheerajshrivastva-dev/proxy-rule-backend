const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const socketIo = require('socket.io');

const path = require('path');
const {
  validateObjectsObject
} = require('./helper');

const { startProxyServer, stopProxyServer, proxyProcess, restartProxyServer } = require('./proxy-process-start')

const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate, passphrase: "dheeraj" };

const app = express();
const port = 3000;

// Initialize Redis client
const { createClient } = require('redis');
app.use(cors());
app.use(express.static(__dirname));

const client = createClient();
const httpsServer = https.createServer(credentials, app);
const io = socketIo(httpsServer);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send a welcome message to the connected client
  socket.emit('message', 'Welcome to the chat!');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

client.on('error', err => console.log('Redis Client Error 1 1', err));

(async () => {
  await client.connect();
  await client.set('ruleListArray', '')
})();

app.use(bodyParser.json());

let ruleListArray = [];

// Middleware to handle Redis and error
// async function getRulesFromRedis(req, res, next) {
//   console.log('requesting');
//   try {
//     const data = await client.GET('ruleListArray')
//     ruleListArray = data;
//     next();
//   } catch (err) {
//     console.error('Error fetching data from Redis:', err);
//     res.status(500).json({ error: 'An internal server error occurred' });
//   }
// }

// Middleware to handle config.json and errors
function getConfigFromJSON(req, res, next) {
  const configFilePath = path.join(__dirname, 'config.json');
  try {
    const data = fs.readFileSync(configFilePath, 'utf8');
    const configData = JSON.parse(data);
    // Set the configData in the request object for routes to access
    req.configData = configData;
    next();
  } catch (err) {
    console.error('Error reading config.json:', err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

// Get the ruleListArray
// app.get('/rules', getRulesFromRedis, (req, res) => {
//   console.log('kkkk');
//   res.json(ruleListArray);
// });
app.get('/rules', getConfigFromJSON, (req, res) => {
  res.json(req.configData);
});

// Update the ruleListArray
app.post('/update-rules', async (req, res) => {
  const updatedConfig = req.body;
  const errors = validateObjectsObject(updatedConfig);
  if (errors.length === 0) {

    // // Store the updated rules in Redis
    // client.set('ruleListArray', JSON.stringify(updatedRules), (err) => {
    //   if (err) {
    //     console.error('Error storing data in Redis:', err);
    //     res.status(500).json({ error: 'An internal server error occurred' });
    //   } else {
    //     res.json({ message: 'Rules updated successfully' });
    //   }
    // });
    
    // try {
    //   await client.set('ruleListArray', JSON.stringify(updatedRules))
    //   res.json({ message: 'Rules updated successfully', data: updatedRules });
    // } catch (e) {
    //   console.error('Error storing data in Redis:', e);
    //   res.status(500).json({ error: 'An internal server error occurred', trace: JSON.stringify(e)});
    // }
    const configFilePath = path.join(__dirname, 'config.json');

    try {
      fs.writeFile(configFilePath, JSON.stringify(updatedConfig, null, 2), (err) => {
        if (err) {
          console.error('Error writing config.json:', err);
          res.status(500).json({ error: 'An internal server error occurred' });
        } else {
          res.json({ message: 'Config updated successfully' });
        }
      });
    } catch (e) {
      console.error('saving json file:', e);
      res.status(500).json({ error: 'An internal server error occurred', trace: JSON.stringify(e)});
    }
  } else {
    res.status(400).json({ error: 'Invalid data format', cause: errors });
  }
});

app.get('/test', (req, res) => {
  res.json('ok')
})

let proxyRunning = false; // Track the proxy server state

// Create an API endpoint to start/stop the proxy server
app.post('/api/proxy', (req, res) => {
  const port = req.body.port;
  const action = req.body.action;

  if (!Number(port)) {
    return res.status(400).json({ error: 'Invalid port', givenPort: port });
  }

  if (action === 'start') {
    if (proxyProcess) {
      return res.status(301).json({ error: 'Proxy is already running' });
    }

    startProxyServer(port, io)
      .then(() => {
        res.status(200).json({ message: `Proxy started on port ${port}` });
      })
      .catch((error) => {
        console.error('Error starting proxy server:', error);
        res.status(500).json({error: `Error starting proxy server, ${error}`});
      });
  } else if (action === 'stop') {
    // if (!proxyProcess) {
    //   return res.status(301).json({ error: 'Proxy is not running' });
    // }

    stopProxyServer(io)
      .then(() => {
        res.status(200).json({ message: 'Proxy stopped successfully' });
      })
      .catch((error) => {
        console.error('Error stopping proxy server:', error);
        res.status(500).json({error: `Error stopping proxy server, ${error}`});
      });
  } else {
    res.status(400).json({ error: 'Invalid action', givenAction: action });
  }
});


app.post('/restartProxy', (req, res) => {
  const bodyParams = req.body;
  if (Number(bodyParams.port)) {
    restartProxyServer(bodyParams.port, io)
      .then(() => {
        proxyRunning = true;
        res.status(200).json({ message: `Proxy restarted successfully`, port: bodyParams.port}); // Send a success response to the client
      })
      .catch((error) => {
        console.error('Error restarted proxy server:', error);
        res.sendStatus(500); // Send a server error response
      });
  } else {
    res.status(301).json({ error: 'Invalid port', givenPort: bodyParams.port});
  }
});

// const io = new Server(httpsServer);

// io.on('connection', (socket) => {
//   console.log('A client connected');

//   // Listen for log messages from the server
//   socket.on('log', (message) => {
//     // Send the log message to the connected client(s)
//     socket.emit('log', message);
//   });
// });
// Start the server
httpsServer.listen(port, () => {
  console.log(`Server started on HTTPS port ==> https://127.0.0.1:${port}`);
});
