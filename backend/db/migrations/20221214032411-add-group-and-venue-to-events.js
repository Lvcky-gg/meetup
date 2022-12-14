'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.addColumn(
        'Events',
        'venueId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'Venues' },
          onDelete: 'CASCADE'
        }
      );
      await queryInterface.addColumn(
        'Events',
        'groupId',
        {
             type: Sequelize.INTEGER,
            references: { model: 'Users' },
            onDelete: 'CASCADE'
        }
      )
     
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.removeColumn('Events', 'venueId');
    await queryInterface.removeColumn('Events', 'groupId');
  }
};
