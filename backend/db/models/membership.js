'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  membership.init({
    groupId: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER,
    status: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'membership',
  });
  return membership;
};