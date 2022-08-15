'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      machineID: {
        type: Sequelize.STRING
      },
      maxProfiles: {
        type: Sequelize.INTEGER
      },
      rat: {
        type: Sequelize.BOOLEAN
      },
      ratData: {
        type: Sequelize.STRING
      },
      createData: {
        type: Sequelize.DATE
      },
      licenseExpired: {
        type: Sequelize.DATE
      },
      dedicated: {
        type: Sequelize.BOOLEAN
      },
      lastSeen: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};