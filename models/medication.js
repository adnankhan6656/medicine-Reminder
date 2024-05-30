'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Medication.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    time: DataTypes.TIME,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    recurring: DataTypes.STRING,
    day_of_week: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medication',
  });
  return Medication;
};