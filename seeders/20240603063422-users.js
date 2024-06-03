'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name:'Adnan Khan',
        email:'pathanadnan160@gmail.com',
        password:'1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Patel Rohan',
        email:'rohan123@gmail.com',
        password:'1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Patel Aryan',
        email:'aryan123@gmail.com',
        password:'1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Patel Deep',
        email:'deep123@gmail.com',
        password:'1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Patel Manan',
        email:'manan123@gmail.com',
        password:'1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Vasu Parsaniya',
        email:'vasu123@gmail.com',
        password:'1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
