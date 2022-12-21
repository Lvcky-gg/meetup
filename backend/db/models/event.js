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
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isLongerThanFive(val){
          if(val.length < 5)throw new Error("Name must be at least 5 characters")
        }
      }
    },
    venueId:{
      type:DataTypes.INTEGER,
      validate:{
        ifVenue(venue){
          if(!venue && (venue != null))throw new Error("Venue does not exist")
        }
      }
    
    },
    groupId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    type: {
      type:DataTypes.STRING,
      validate:{
        isOnlineOrInPerson(string){
          if( !((string.toLowerCase() === 'online') || (string.toLowerCase() === 'in person'))){
            throw new Error("Type must be 'Online' or 'In person'")
          }
        }
      }
    },
    startDate:{
      type:DataTypes.DATE,
      validate:{
        isValidDate(date){
          if(!(date > new Date()))throw new Error("Start date must be in the future")
        }
      }
    },
    endDate:{
      type:DataTypes.DATE,
      validate:{
        isAfter(date){
          if(!(date >this.startDate )) throw new Error("End date is less than start date")
        
        }
      }
    },
    capacity: {
      type:DataTypes.INTEGER,
      validate:{
        isInt:true
      }
    },
    price: {
      type:DataTypes.DECIMAL,
      validate:{
        priceIsValid(price){
          if((price.toString().split('.')[1].length > 2))throw new Error("Price is invalid")
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{isValid(val){
        if(!val)throw new Error("Description is required")
      }
    }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};