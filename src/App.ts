import { Sequelize } from 'sequelize-typescript';
import bodyParser from 'body-parser';
import express from 'express';
import users from './routers/users';
import { Server } from 'http';

export class App {
  private app: express.Application;
  private server: Server;
  private sequelize: Sequelize;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(users());
  }

  private async initDatabase() {
    this.sequelize = new Sequelize({
      database: 'friends',
      dialect: 'mysql',
      host: process.env.DB_HOST,
      username: 'root',
      password: '0000',
      modelPaths: [`${__dirname}/models`],
      logging: false,
      operatorsAliases: {
        $and: Sequelize.Op.and,
        $or: Sequelize.Op.or,
        $eq: Sequelize.Op.eq,
        $gt: Sequelize.Op.gt,
        $lt: Sequelize.Op.lt,
        $lte: Sequelize.Op.lte,
        $like: Sequelize.Op.like,
      },
    });
    await this.sequelize.sync({
      force: process.env.APP_MODE === 'test',
    });
  }

  async start(port: number = 3000) {
    await this.initDatabase();
    this.server = this.app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }

  close() {
    this.sequelize.close();
    this.server.close();
  }

  getApp() {
    return this.app;
  }
}
