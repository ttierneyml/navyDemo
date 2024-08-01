const config = require('./settings'),
      express = require('express')
      helmet = require('helmet'),
      cors = require('cors'),
      morgan = require('morgan'),
      { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware'),
      { handleDocumentsRes, handleSearchRes} = require('./handlers');
const app = express();

// Middle tier host may be optionally passed on command-line: 
// node server.js myhostname.company.com
const host = process.argv[2] || config.host || 'localhost';

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// ML REST server
const restUrl = "http://" + host + ":" + config.rest["rest-api"].port;
const restUser = config.user["user-name"];
const restPass = config.user.password;

app.use('/v1/*', createProxyMiddleware({
  target: restUrl,
  changeOrigin: true,
  //This line is commented out because it overrides the authentication parameters from the incoming request.
  // auth: restUser + ':' + restPass,
  selfHandleResponse: true,
  // Transform requests if needed
  // onProxyReq(proxyReq, req, res) {
  //   // Example: https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/modify-post.md
  // },
  // Transform responses if needed
  onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    let result = responseBuffer;
    switch (req.path) {
      case '/v1/search' || 'v1/geoQueryService':
        result = handleSearchRes(responseBuffer, proxyRes, req, res);
        break;
      case '/v1/documents':
        result = handleDocumentsRes(responseBuffer, proxyRes, req, res);
        break;
    }
    return result;
  }),
}));

app.listen(config.server.port, host, () => {
    console.log(`Starting proxy at ${host}:${config.server.port}`);
});