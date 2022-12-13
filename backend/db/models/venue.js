'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  venue.init({
    groupId: DataTypes.INTEGER,
    address: DataTypes.FLOAT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'venue',
  });
  return venue;
};