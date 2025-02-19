'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSession.init({
    user_id: DataTypes.NUMBER,
    session_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserSession',
  });
  return UserSession;
};