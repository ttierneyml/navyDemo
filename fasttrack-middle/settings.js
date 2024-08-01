const config = {};

config.project = {
  name: "ml-demo-app"
};

config.host = "localhost";

// Proxy server
config.server = {
  port: 4000
}

// ML REST server
config.rest = {
  "rest-api": {
    name: config.project.name + "-rest",
    port: 8011,
  },
  security: {
    authentication: "basic"
  },
};

// ML user with REST access
config.user = {
  "user-name": config.project.name + "-user", 
  "password": "password"
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
}