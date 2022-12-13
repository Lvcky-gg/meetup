'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event.init({
    venueId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    name: DataTypes.FLOAT,
    type: DataTypes.FLOAT,
    capacity: DataTypes.NUMERIC,
    price: DataTypes.DECIMAL,
    description: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};