'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  
  async up (queryInterface, Sequelize) {
    options.tableName = 'Groups'
      await queryInterface.addColumn(
        options,
        'organizerId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'Users' },
          onDelete: 'CASCADE'
        }
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Groups', 'organizerId')
  }
};
