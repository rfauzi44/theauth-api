"use strict";
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: faker.datatype.uuid(),
          name: faker.name.fullName(),
          email: faker.internet.email(),
          gender: "male",
          password: faker.internet.password(),
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
