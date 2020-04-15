const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const responseTime = require('response-time');
const appRoutes = require('./routes')

const app = express();


app.set('port', process.env.PORT || 8989);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('common'));
app.use(responseTime())
app.use(appRoutes)

try {
  app.listen(app.get('port'));
  console.log(`server is listening on ${app.get('port')}`)
} catch (err) {
  console.error('error');
  process.exit(2);
}