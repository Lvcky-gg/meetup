'use strict';
const {
  Model, INTEGER
} = require('sequelize');
const Group = require('./group');
const User = require('./user')
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Membership.belongsTo(models.User,{foreignKey:'memberId'})
      Membership.belongsTo(models.Group,{foreignKey:'groupId'})
    }
  }
  Membership.init({
    status: DataTypes.STRING,
    groupId:{type:DataTypes.INTEGER,references:{model:Group, key:"id"}},
    memberId:{type:DataTypes.INTEGER,references:{model:User, key:"id"}}
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};