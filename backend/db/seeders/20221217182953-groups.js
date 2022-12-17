'use strict';

const { query } = require('express');
const { options } = require('../../routes');
// let options = {};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = "Groups";
   return queryInterface.bulkInsert(options, [
    {
      "name": "Evening Tennis on the Water",
      "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
      "type": "In person",
      "private": true,
      "city": "New York",
      "state": "NY", 
      "organizerId":1
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Evening Tennis on the Water"] }
    }, {});
  }
};
