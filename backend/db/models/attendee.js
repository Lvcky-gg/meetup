'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendee.hasMany(models.Event,{foreignKey:'eventId'});
      Attendee.hasMany(models.User, {foreignKey:'userId'})
    }
  }
  Attendee.init({
    eventId: DataTypes.INTEGER,
    status: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};