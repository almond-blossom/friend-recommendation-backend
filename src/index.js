const bodyParser = require('body-parser');
const app = require('express')();
const users = require('./routers/users');

app.use(bodyParser.json());
app.use(users());

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
