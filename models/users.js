'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    machineID: DataTypes.STRING,
    maxProfiles: DataTypes.INTEGER,
    rat: DataTypes.BOOLEAN,
    ratData: DataTypes.STRING,
    createData: DataTypes.DATE,
    licenseExpired: DataTypes.DATE,
    dedicated: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};