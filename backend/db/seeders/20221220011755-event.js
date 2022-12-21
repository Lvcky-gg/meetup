'use strict';

const { query } = require('express');
const { options } = require('../../routes');
// console.log(options)
// let options = {};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = "Events";
   return queryInterface.bulkInsert(options, [
    {
          "name": "Tennis Group First Meet and Greet",
          "type": "Online",
          "capacity": 10,
          "price": 18.50,
          "description": "The first meet and greet for our group! Come say hello!",
          "startDate": "2021-11-19 20:00:00",
          "endDate": "2021-11-19 22:00:00",
          "venueId": 1,
          "groupId": 1
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Tennis Group First Meet and Greet"] }
    }, {});
  }
};