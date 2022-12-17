'use strict';
const { query } = require('express');
const { options } = require('../../routes');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = "Memberships";
   return queryInterface.bulkInsert(options, [
    {
      "status":"accepted",
      "groupId":1,
      "memberId":1
    },
    {
      "status":"pending",
      "groupId":1,
      "memberId":2
    },
    {
      "status":"pending",
      "groupId":1,
      "memberId":3
    }
   ])
  
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      memberId: { [Op.in]: [1,2, 3] }
    }, {});
  
  }
};
