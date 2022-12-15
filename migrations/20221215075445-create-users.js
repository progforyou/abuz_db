'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    /* for add column
    await queryInterface.addColumn(
        'Users',
        'test',
        Sequelize.INTEGER
    );*/
    /* for remove column
    await queryInterface.removeColumn(
        'Users',
        'test'
    )*/
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
      machineIDs: {
        type: Sequelize.TEXT,
        get() {
          return this.getDataValue('machineIDs').split(';')
        },
        set(val) {
          this.setDataValue('machineIDs',val.join(';'));
        },
      },
      maxMachines: {
        type: Sequelize.INTEGER,
      },
      activeMachineIDs: {
        type: Sequelize.TEXT,
        get() {
          return this.getDataValue('activeMachineIDs').split(';')
        },
        set(val) {
          this.setDataValue('activeMachineIDs',val.join(';'));
        },
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
      ownerIP: {
        type: Sequelize.STRING
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