'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id'
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'first_name'
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'last_name'
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          field: 'email'
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'password'
        },
        verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          field: 'verified'
        },
        bio: {
          type: Sequelize.TEXT,
          allowNull: true,
          field: 'bio'
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'phone'
        },
        github: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'github'
        },
        linkedin: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'linkedin'
        },
        twitter: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'twitter'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'created_at'
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'updated_at'
        }
      },
      {
        tableName: 'users'
      }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  }
};
