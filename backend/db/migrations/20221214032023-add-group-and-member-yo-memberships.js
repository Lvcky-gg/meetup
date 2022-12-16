'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
   await queryInterface.addColumn(
    'Memberships',
    'groupId',
    {
        type: Sequelize.INTEGER,
        references: { model: 'Groups' },
        onDelete: 'CASCADE'
    }
   );
   await queryInterface.addColumn(
    'Memberships',
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
