'use strict';
const { query } = require('express');
const { options } = require('../../routes');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = "EventImages";
   return queryInterface.bulkInsert(options, [
    {
      "url": "image url",
      "preview": false,
      "eventId":1
    },
    {
      "url": "image url",
      "preview": false,
      "eventId":1
    
    },
    {
      "url": "image url",
      "preview": false,
      "eventId":1
    }
   ])
  
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "EventImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1] }
    }, {});
  
  }
};
