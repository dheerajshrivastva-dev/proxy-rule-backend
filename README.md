# Transparent Proxy with Rate Limiting and Easy API Configuration

## Overview

This project provides a powerful transparent proxy server with built-in rate-limiting capabilities and an intuitive UI for effortless API configuration. It allows you to easily manage proxy rules, set up rate limits, and monitor network traffic in real time.

## Demo

[UI demo](https://github.com/dheerajshrivastva-dev/proxy-rule-backend/assets/46869372/0ce15ef8-5972-4b48-bd00-4424a1016109)

[UI demo edit or remove rules](https://github.com/dheerajshrivastva-dev/proxy-rule-backend/assets/46869372/cf45ce12-307f-463a-8886-39547165da47)


## Features

### Transparent Proxy Server

- Intercept and forward network traffic seamlessly.
- Support for both HTTP and HTTPS traffic.
- User-friendly interface for defining custom proxy rules.

### Rate Limiting

- Built-in rate limiting functionality to control API traffic.
- Configure rate limits per API, allowing you to manage access and prevent abuse.
- Fine-grained control over requests per second (RPS) and requests per minute (RPM).

### User Interface (UI)

- An intuitive web-based UI for configuring API rules and managing the proxy server.
- Easily add, edit, and delete API configurations through the UI.
- Real-time log display for monitoring network activities.
- Responsive design for optimal use on all devices.

### Easy API Configuration

- Simplified API rule creation using a form-based interface.
- Specify each API's domain and setup rules.
- Edit or delete existing API configurations with ease.

## Getting Started

Follow these steps to set up the project and start using rate limiting for your APIs:

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
2. Configure API rules by adding, editing, or deleting them.
3. Utilize the built-in rate-limiting features to manage access to your APIs effectively.
4. Monitor network activities and view real-time logs using the UI.

## Configuration

You can easily configure API rules through the UI, allowing you to specify:

- Host name or Domain name.
- Rate limits for each API Domain, ensuring controlled access.

## Logging

The UI offers a real-time log display, providing insights into network activities, rate limiting, and API interactions.

## Contributing

Contributions to this project are welcome. Please follow our [Contribution Guidelines](CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com/)

## Contact

If you have any questions or feedback, please contact us at [dheerajshrivastva2@gmail.com].

Experience the power of rate-limiting and simplified API configuration with our transparent proxy server!
