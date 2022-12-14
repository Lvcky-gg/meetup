'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.addColumn(
        'Groups',
        'groupId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'Users' },
          onDelete: 'CASCADE'
        }
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Groups', 'groupId')
  }
};
