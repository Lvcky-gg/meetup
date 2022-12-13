'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      venueId: {
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.FLOAT
      },
      type: {
        type: Sequelize.FLOAT
      },
      capacity: {
        type: Sequelize.NUMERIC
      },
      price: {
        type: Sequelize.DECIMAL
      },
      description: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};