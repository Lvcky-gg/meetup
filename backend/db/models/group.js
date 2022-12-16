'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
   
    static associate(models) {
      // define association here
      Group.hasMany(models.GroupImage,{foreignKey:'groupId'});
      // Group.belongsTo(models.Membership, {foreignKey:'groupId'});
      Group.belongsTo(models.User, {foreignKey:'organizerId'});
      // Group.belongsTo(models.Venue, {foreignKey:'groupId'});
    }
  }
  Group.init({
    name: {
      
        type:DataTypes.STRING(60),
        validate:{
          isLessThanSixty(string){
            if(string.length > 60){
              throw new Error("Name must be 60 characters or less")
            }
          }
        
      }
    },
    about:{ 
      type:DataTypes.STRING,
      validate:{
        isLongerThanSixty(string){
          if(string.length < 50){
            throw new Error("About must be 50 characters or more")
          }
        }
      }
    },
    type: {
      type:DataTypes.STRING,
      validate:{
        isOnlineOrInPerson(string){
          if( !((string.toLowerCase() === 'online') || (string.toLowerCase() === 'in person'))){
            console.log(string)
            throw new Error("Type must be 'Online' or 'In person'")
          }
        }
      }
    },
    private:{ 
      type:DataTypes.BOOLEAN,
      validate:{
        isBoolean(val){
          if (typeof val != "boolean"){
            throw new Error("Private must be a boolean")
          }
        }
      }
    },
    city:{ 
      type:DataTypes.STRING,
      validate:{
        cityExists(val){
          if(!val){
            throw new Error("City is required")
          }
        }
      }
    },
    state:{ 
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        stateExists(val){
          if(!val){
            throw new Error("State is required")
          }
        },
        len:[2,2]
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};