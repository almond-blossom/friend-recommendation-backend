import supertest from 'supertest';
import { App } from '../src/App';

const app = new App().getApp();

describe('/users/:id - 유저 정보 획득', () => {
  test('200', async () => {
    const desire: any = {
      id: 'test',
      name: '테스트',
      code: 'AA',
      friends: [],
      cash: 0,
    };

    supertest(app)
      .get('/users/test')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body).toMatchObject(desire);
      });
  });
});
