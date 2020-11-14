'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Products', 
   [
      { 
        name: 'T-Shirt Dry Crew Neck Lengan Pendek', 
        image_url : 'https://im.uniqlo.com/images/common/pc/goods/431599/item/47_431599_middles.jpg',
        price : 149000,
        stock : 10,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      { 
        name: 'T-Shirt Slub Jersey Crew Neck Lengan Pendek', 
        image_url : 'https://im.uniqlo.com/images/common/pc/goods/422996/item/00_422996_middles.jpg',
        price : 99000,
        stock : 7,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      { 
        name: 'Celana Jersey Rileks', 
        image_url : 'https://im.uniqlo.com/images/common/pc/goods/424075/item/65_424075_middles.jpg',
        price : 129000,
        stock : 6,
        createdAt : new Date(),
        updatedAt : new Date()
      }
   ], {})
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Products', null, {})
  }
};
