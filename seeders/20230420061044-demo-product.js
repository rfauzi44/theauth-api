"use strict";
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const user = await queryInterface.sequelize.query(`SELECT id FROM "users" LIMIT 1;`);
    const image = ["seed1.jpg", "seed2.jpg", "seed3.jpg", "seed4.jpg"]

    const products = [...Array(4)].map((_,index) => {
      return {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        image: image[index],
        user_id: user[0][0].id,
        created_at: new Date(),
      };
    });

    await queryInterface.bulkInsert("products", products);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
