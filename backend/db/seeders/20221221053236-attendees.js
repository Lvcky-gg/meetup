'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Attendees";
    await queryInterface.bulkInsert(options, 
      [{
        "status":"host",
        "eventId":1,
        "userId":1
      },
      {
        "status":"pending",
        "eventId":1,
        "userId":2
      },
      {
        "status":"pending",
        "eventId":1,
        "userId":3
      }]
    )
  },

  async down (queryInterface, Sequelize) {
    
    
  }
};
