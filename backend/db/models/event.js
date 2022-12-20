'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Event.belongsTo(models.Attendee,{foreignKey:'eventId'});
      // Event.hasMany(models.EventImage,{foreignKey:'eventId'});
      // Event.hasMany(models.Venue, {foreignKey:'venueId'});
      Event.belongsTo(models.Group, {foreignKey:'venueId'});
      // Event.belongsToMany(models.Venue,
      //   {through:models.group, onDelete:"CASCADE"});
    }
  }
  Event.init({
    name: DataTypes.FLOAT,
    type: DataTypes.FLOAT,
    capacity: DataTypes.NUMERIC,
    price: DataTypes.DECIMAL,
    description: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};