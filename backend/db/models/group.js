'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Group.hasMany(models.GroupImage,{foreignKey:'groupId'});
      // Group.belongsTo(models.Membership, {foreignKey:'groupId'});
      // Group.hasMany(models.User, {foreignKey:'organizerId'});
      // Group.belongsTo(models.Venue, {foreignKey:'groupId'});
    }
  }
  Group.init({
    name: DataTypes.STRING,
    about: DataTypes.STRING,
    type: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};