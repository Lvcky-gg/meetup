'use strict';
const { query } = require('express');
const { options } = require('../../routes');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = "GroupImages";
   return queryInterface.bulkInsert(options, [
    {
      "url": "image url",
      "preview": false,
      "groupId":1
    },
    {
      "url": "image url",
      "preview": false,
      "groupId":1
    
    },
    {
      "url": "image url",
      "preview": false,
      "groupId":1
    }
   ])
  
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "GroupImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1] }
    }, {});
  
  }
};
