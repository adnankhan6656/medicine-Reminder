'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Medication,{foreignKey:'user_id'});
      models.Medication.belongsTo(User,{foreignKey:'user_id'});
      User.hasMany(models.UserSession,{foreignKey:'user_id'});
      models.UserSession.belongsTo(User,{foreignKey:'user_id'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};