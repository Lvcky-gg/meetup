'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Venues'
     await queryInterface.addColumn(
        options,
        'groupId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'Groups' },
          onDelete: 'CASCADE'
        }

      )
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('Venues', 'groupId')
  }
};
