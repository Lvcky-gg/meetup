'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Attendees'
      await queryInterface.addColumn(
        options,
        'eventId',
        {
            type: Sequelize.INTEGER,
            references: { model: 'Events' },
            onDelete: 'CASCADE'
        }
      );
      await queryInterface.addColumn(
        options,
        'userId',
        {
            type: Sequelize.INTEGER,
            references: { model: 'Users' },
            onDelete: 'CASCADE'
        }
      )
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.removeColumn('Attendees', 'eventId');
    await queryInterface.removeColumn('Attendees', 'userId')
  }
};
