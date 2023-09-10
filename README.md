# Transparent Proxy and UI

## Overview

This project provides a transparent proxy server with a user-friendly UI for managing proxy configurations and monitoring logs. It allows you to easily set up and configure proxy rules, start/stop the proxy server, and view real-time logs.

## Demo

- [Watch the Video 1](https://drive.google.com/file/d/1GKEsk2LnBxA32W7_YJIY4FnaP1rT65gW/view?usp=sharing)

- [Watch the Video 2](https://drive.google.com/file/d/1SBlttRZsBsH9xGH1a7hqZX4m04EL8hL_/view?usp=sharing)

## Features

### Transparent Proxy Server

- A transparent proxy server that intercepts and forwards network traffic.
- Supports HTTP and HTTPS traffic.
- Allows you to define custom proxy rules to intercept and modify network requests and responses.

### User Interface (UI)

- An intuitive web-based UI for configuring proxy rules and managing the proxy server.
- Easily add, edit, and delete proxy rules through the UI.
- Start and stop the proxy server with the click of a button.
- Real-time log display to monitor proxy server activities.
- Responsive design for seamless use on both desktop and mobile devices.

### Configuration Management

- Create and manage proxy rules using a user-friendly form-based interface.
- Specify target hosts, ports, and modification rules for each proxy rule.
- Edit and delete existing rules as needed.

## Getting Started

Follow these steps to get the project up and running:

### Prerequisites

- Node.js: Ensure you have Node.js installed on your system.

### Installation

1. Clone the repository:

```bash
  git clone https://github.com/dheerajshrivastva-dev/proxy-rule-backend
  cd proxy-rule-backend
```

2. Install dependencies:

```bash
  npm install
```

3. Start the application:

```bash
 npm start
```

4. Access the UI in your web browser at `https://127.0.0.1:3000/`.

### Usage

1. Access the web-based UI.
2. Configure proxy rules by adding, editing, or deleting them.
3. Start the proxy server to intercept and modify network traffic based on your rules.
4. Monitor proxy server activities and view logs in real-time using the UI.

## Configuration

You can configure the proxy server by adding or editing rules through the UI. Each rule allows you to specify the following:

- Target host and port to intercept traffic.
- Modification rules to apply to intercepted requests and responses.

## Logging

The UI provides a real-time log display to help you monitor the proxy server's activities. You can track requests, responses, and any modifications made to network traffic.

## Contributing

Contributions to this project are welcome. Please follow our [Contribution Guidelines](CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com/)

## Contact

If you have any questions or feedback, please feel free to contact us at [email@example.com].

Happy proxying!
