'use strict';

const { generateHash } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [
      { 
        email : 'admin@mail.com',
        password : generateHash('admins'),
        role : 'admin',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
