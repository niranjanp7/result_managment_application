'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("student", [
      {
        roll_no: 1,
        name: "Ben Zymen",
        dob: new Date(2002, 2, 1)
      },
      {
        roll_no: 2,
        name: "Sam Panze",
        dob: new Date(2001, 4, 18)
      },
      {
        roll_no: 3,
        name: "Kine Tealer",
        dob: new Date(2001, 8, 9)
      },
      {
        roll_no: 4,
        name: "Mir Kazim",
        dob: new Date(2002, 2, 21)
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("student", null, {});
  }
};
