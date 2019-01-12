import bodyParser from 'body-parser';
import express from 'express';
import users from './routers/users';

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(users());
  }

  start(port: number = 3000) {
    this.app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}
