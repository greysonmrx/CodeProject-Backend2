import request from 'supertest';

import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        first_name: 'Greyson',
        last_name: 'Filho',
        email: 'greysonmrx@gmail.com',
        password: '12345'
      });

    expect(response.body).toHaveProperty('id');
  });
});
