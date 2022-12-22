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
      // Venue.hasMany(models.Attendee, {foreignKey:'venueId'})
      Venue.hasMany(models.Event, {foreignKey:'venueId'});
      // Venue.belongsToMany(models.Event,
      //   {through:models.Attendee, onDelete:"CASCADE", foreignKey:'venueId' });
    }
  }
  Venue.init({
    address:{ 
      type:DataTypes.STRING,
      validate:{
        streetAddressExists(val){
          if(!val)throw new Error("Street address is required")
        }
      }
    },
    city: {
      type:DataTypes.STRING,
      validate:{
        cityExists(val){
          if(!val)throw new Error("City is required")
        }
      }
    },
    state: {
      type:DataTypes.STRING,
      validate:{
        stateExists(val){
          if(!val)throw new Error("State is required")
        }
      }
    },
    lat: {
      type:DataTypes.DECIMAL,
      validate:{
      latIsVal(val){
        if(typeof val != "number")throw new Error("Latitude is not valid")
      }
    }
    },
    lng: {
      type:DataTypes.DECIMAL,
      validate:{
        latIsVal(val){
          if(typeof val != "number")throw new Error("Longitude is not valid")
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};