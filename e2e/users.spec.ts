import { default as request } from 'supertest';
import { App } from '../src/App';

describe('POST /users - 유저 가입', () => {
  const form = {
    id: 'fruits',
    pass: '1234',
    name: 'apple',
  };
  const agent = request(new App().getApp());
  test('일반 가입', (done: any) => {
    agent
      .post('/users')
      .send(form)
      .set('Accept', 'application/json')
      .expect(200)
      .end(done);
  });
  test('같은 아이디 가입 요청 시 400', (done: any) => {
    agent
      .post('/users')
      .send(form)
      .set('Accept', 'application/json')
      .expect(400)
      .end(done);
  });
});

describe('/users/:id - 유저 정보 획득', () => {
  test('200', () => {
    const desire: any = {
      id: 'test',
      name: '테스트',
      code: 'AA',
      friends: [],
      cash: 0,
    };
    request(new App().getApp())
      .get('/users/test')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body).toMatchObject(desire);
      });
  });
});
