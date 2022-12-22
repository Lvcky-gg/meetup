'use strict';
const { query } = require('express');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = "Memberships";
   return queryInterface.bulkInsert(options, [
    {
      "status":"host",
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
    options.tableName = "Memberships";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      memberId: { [Op.in]: [1,2, 3] }
    }, {});
  
  }
};
