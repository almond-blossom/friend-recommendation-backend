import { default as request } from 'supertest';
import { App } from '../src/App';

let app: App;
let agent: request.SuperTest<request.Test>;

beforeEach(async () => {
  app = new App();
  await app.start();
  agent = request(app.getApp());
});

afterEach(() => {
  app.close();
});

export {
  agent,
};
