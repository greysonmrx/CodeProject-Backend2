import bcrypt from 'bcryptjs';
import request from 'supertest';

import app from '../../src/app';
import User from '../../src/app/models/User';
import truncate from '../utils/truncate';

const data = {
  first_name: 'Greyson',
  last_name: 'Filho',
  email: 'greysonmrx@gmail.com',
  unencrypted_password: '123456'
};

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send(data);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send(data);

    const response = await request(app)
      .post('/users')
      .send(data);

    expect(response.status).toBe(400);
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create(data);

    const compareHash = await bcrypt.compare(
      data.unencrypted_password,
      user.password
    );

    expect(compareHash).toBe(true);
  });
});
