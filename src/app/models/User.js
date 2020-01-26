import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        verified: Sequelize.BOOLEAN,
        bio: Sequelize.TEXT,
        phone: Sequelize.STRING(11),
        github: Sequelize.STRING,
        linkedin: Sequelize.STRING,
        twitter: Sequelize.STRING
      },
      {
        sequelize,
        modelName: 'User'
      }
    );

    return this;
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}

export default User;
