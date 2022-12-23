'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.addColumn(
        'Attendees',
        'eventId',
        {
            type: Sequelize.INTEGER,
            references: { model: 'Events' },
            onDelete: 'CASCADE',
            allowNull:false
        }
      );
      await queryInterface.addColumn(
        'Attendees',
        'userId',
        {
            type: Sequelize.INTEGER,
            references: { model: 'Users' },
            onDelete: 'CASCADE',
            allowNull:false
        }
      )
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.removeColumn('Attendees', 'eventId');
    await queryInterface.removeColumn('Attendees', 'userId')
  }
};
