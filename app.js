const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const responseTime = require('response-time');
const appRoutes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 8989);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('common'));
app.use(responseTime());
app.use(appRoutes);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.listen(app.get('port'), () => {
  console.log(`server is listening on ${app.get('port')}`);
});

module.exports = app;
