import bodyParser from 'body-parser';
import express from 'express';
import users from './routers/users';

const app = express();

app.use(bodyParser.json());
app.use(users());

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
