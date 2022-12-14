'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.addColumn(
        'Venues',
        'groupId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'Groups' },
          onDelete: 'CASCADE'
        }

      )
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.addColumn('Venues', 'groupId')
  }
};
