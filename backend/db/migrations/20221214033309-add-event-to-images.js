'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.addColumn(
        'EventImages',
        'eventId',
        {
             type: Sequelize.INTEGER,
             references: { model: 'Events' },
            onDelete: 'CASCADE',
            allowNull:false
        }
      )
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('EventImages', 'eventId')
  }
};
