'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  groupImage.init({
    url: DataTypes.FLOAT,
    groupId: DataTypes.INTEGER,
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'groupImage',
  });
  return groupImage;
};