import bcrypt from 'bcryptjs';
import request from 'supertest';

import app from '../../src/app';
import User from '../../src/app/models/User';
import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        first_name: 'Greyson',
        last_name: 'Filho',
        email: 'greysonmrx@gmail.com',
        unencrypted_password: '12345'
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        first_name: 'Greyson',
        last_name: 'Filho',
        email: 'greysonmrx@gmail.com',
        unencrypted_password: '12345'
      });

    const response = await request(app)
      .post('/users')
      .send({
        first_name: 'Greyson',
        last_name: 'Filho',
        email: 'greysonmrx@gmail.com',
        unencrypted_password: '12345'
      });

    expect(response.status).toBe(400);
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      first_name: 'Greyson',
      last_name: 'Filho',
      email: 'greysonmrx@gmail.com',
      unencrypted_password: '12345'
    });

    const compareHash = await bcrypt.compare('12345', user.password);

    expect(compareHash).toBe(true);
  });
});
