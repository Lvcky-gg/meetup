'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'EventImages'
      await queryInterface.addColumn(
        options,
        'eventId',
        {
             type: Sequelize.INTEGER,
             references: { model: 'Events' },
            onDelete: 'CASCADE'
        }
      )
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('EventImages', 'eventId')
  }
};
