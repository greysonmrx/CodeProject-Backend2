import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        unencrypted_password: Sequelize.VIRTUAL,
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

    this.addHook('beforeSave', async user => {
      if (user.unencrypted_password) {
        user.password = await bcrypt.hash(user.unencrypted_password, 8);
      }
    });

    return this;
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}

export default User;
