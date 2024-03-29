'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Events'
      await queryInterface.addColumn(
        options,
        'venueId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'Venues' },
          onDelete: 'CASCADE'
        }
      );
      await queryInterface.addColumn(
        options,
        'groupId',
        {
             type: Sequelize.INTEGER,
             allowNull:false,
            references: { model: 'Groups' },
            onDelete: 'CASCADE'
        }
      )
     
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.removeColumn('Events', 'venueId');
    await queryInterface.removeColumn('Events', 'groupId');
  }
};
