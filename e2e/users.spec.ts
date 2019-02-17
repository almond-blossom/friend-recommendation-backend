import { default as request } from 'supertest';
import { App } from '../src/App';

process.env.DB_HOST = 'localhost';
process.env.APP_MODE = 'test';

describe('POST /users - 유저 가입', () => {
  const server = new App();

  beforeAll(async () => {
    await server.start();
  });
  afterAll(() => {
    server.close();
  });
  const form = {
    id: 'fruits',
    pass: '1234',
    name: 'apple',
  };

  const agent = request(new App().getApp());
  test('일반 가입', (done) => {
    agent
      .post('/users')
      .send(form)
      .set('Accept', 'application/json')
      .expect(200)
      .end(done);
  });
  test('같은 아이디 가입 요청 시 400', (done) => {
    agent
      .post('/users')
      .send(form)
      .set('Accept', 'application/json')
      .expect(400)
      .end(done);
  });
});

describe('/users/:id - 유저 정보 획득', () => {
  const server = new App();

  beforeAll(async () => {
    await server.start();
  });
  afterAll(() => {
    server.close();
  });

  test('200', async (done) => {
    const agent = request(new App().getApp());
    const form = {
      id: 'fruits',
      pass: '1234',
      name: 'apple',
    };
    await agent
      .post('/users')
      .send(form)
      .set('Accept', 'application/json');

    agent
      .get('/users/fruits')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.id).toBe('fruits');
        expect(res.body.name).toBe('apple');
        expect(res.body.friends).toMatchObject([]);
        expect(res.body.cash).toBe(0);
        expect(res.body.code).toHaveLength(2);
        expect(typeof res.body.code).toBe('string');
        done();
      });
  });
});
