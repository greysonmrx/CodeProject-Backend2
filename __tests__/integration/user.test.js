import bcrypt from 'bcryptjs';
import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      unencrypted_password: '123456'
    });

    const compareHash = await bcrypt.compare('123456', user.password);

    expect(compareHash).toBe(true);
  });

  it('should not be able to register without password', async () => {
    const user = await factory.attrs('User', {
      unencrypted_password: null
    });

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to register if the password is less than six chars', async () => {
    const user = await factory.attrs('User', {
      unencrypted_password: '12345'
    });

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
