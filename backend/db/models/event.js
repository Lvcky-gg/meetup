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
      Event.hasMany(models.EventImage,{foreignKey:'eventId'});
      Event.belongsTo(models.Venue, {foreignKey:'venueId'});
      // Event.hasMany(models.Venue, {foreignKey:'venueId'});
      Event.belongsTo(models.Group, {foreignKey:'groupId'})
      // Event.belongsToMany(models.Venue,
      //   {through:models.group, onDelete:"CASCADE"});
      Event.hasMany(models.Attendee, {foreignKey:'eventId'})
      Event.belongsToMany(models.User,
        {through:models.Attendee, onDelete:"CASCADE", foreignKey:"eventId"})
    }
  }
  Event.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    startDate:DataTypes.DATE,
    endDate:DataTypes.DATE,
    capacity: DataTypes.NUMERIC,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};