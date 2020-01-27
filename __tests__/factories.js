import { factory } from 'factory-girl';
import faker from 'faker';

import User from '../src/app/models/User';

factory.define('User', User, {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  unencrypted_password: faker.internet.password()
});

export default factory;
