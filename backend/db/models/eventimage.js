'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  eventImage.init({
    url: DataTypes.FLOAT,
    eventId: DataTypes.INTEGER,
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'eventImage',
  });
  return eventImage;
};