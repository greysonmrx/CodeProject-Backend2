import Sequelize from 'sequelize';

import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => {
        return model.init(this.connection);
      })
      .map(model => {
        return model.associate && model.associate(this.connection.models);
      });
  }
}

export default new Database();
