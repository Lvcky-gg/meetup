'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Venue.belongsTo(models.Event, {foreignKey:'venueId'});
      Venue.belongsTo(models.Group, {foreignKey:'groupId'});
      // Venue.belongsToMany(models.Event,
      //   {through:models.group, onDelete:"CASCADE"});
    }
  }
  Venue.init({
    address: DataTypes.FLOAT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};