const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 443;

app.use(express.static(`${__dirname}/dist/`));

const https = require('https');
const selfSigned = require('openssl-self-signed-certificate');

const options = {
  key: selfSigned.key,
  cert: selfSigned.cert,
};

const serv = https.createServer(options, app);
serv.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.warn(`Application is started on https://localhost:${PORT}/`);
});
app.get('*', (request, response) => {
  response.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});
