const path = require('path');
const express = require('express');
const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
app.use(express.static('./dist/angular-boilerplate'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/angular-boilerplate/index.html'));
});

app.use(forceSSL());

app.listen(process.env.PORT || 8080);