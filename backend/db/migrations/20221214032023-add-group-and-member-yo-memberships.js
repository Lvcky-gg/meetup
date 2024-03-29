'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Memberships'
   await queryInterface.addColumn(
    options,
    'groupId',
    {
        type: Sequelize.INTEGER,
        references: { model: 'Groups' },
        onDelete: 'CASCADE'
    }
   );
   await queryInterface.addColumn(
    options,
    'memberId',
    {
         type: Sequelize.INTEGER,
        references: { model: 'Users' },
        onDelete: 'CASCADE'

    }
   )
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('Memberships', 'groupId');
   await queryInterface.removeColumn('Memberships', 'memberId');
  }
};
