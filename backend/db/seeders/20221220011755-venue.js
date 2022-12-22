'use strict';

const { query } = require('express');
const { options } = require('../../routes');
// let options = {};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = "Venues";
   return queryInterface.bulkInsert(options, [
    {

      "address": "123 Disney Lane",
      "city": "New York",
      "state": "NY",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "groupId":1
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ["123 Disney Lane"] }
    }, {});
  }
};