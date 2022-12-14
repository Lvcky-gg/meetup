'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // EventImage.belongsTo(models.Event,{foreignKey:'eventId'})
    }
  }
  EventImage.init({
    url: DataTypes.FLOAT,
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'EventImage',
  });
  return EventImage;
};