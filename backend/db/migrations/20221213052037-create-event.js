'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // venueId: {
      //   type: Sequelize.INTEGER,
      //   references: { model: 'Venues' },
      //   onDelete: 'CASCADE'
      // },
      // groupId: {
      //   type: Sequelize.INTEGER,
      //   references: { model: 'Users' },
      //   onDelete: 'CASCADE'
      // },
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};