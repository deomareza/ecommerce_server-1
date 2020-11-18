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
        image_url : 'https://deo-ecommerce-bucket.s3-ap-southeast-1.amazonaws.com/products/47_431599_middles.jpg',
        price : 149000,
        stock : 10,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      { 
        name: 'T-Shirt Slub Jersey Crew Neck Lengan Pendek', 
        image_url : 'https://deo-ecommerce-bucket.s3-ap-southeast-1.amazonaws.com/products/00_422996_middles.jpg',
        price : 99000,
        stock : 7,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      { 
        name: 'Celana Jersey Rileks', 
        image_url : 'https://deo-ecommerce-bucket.s3-ap-southeast-1.amazonaws.com/products/65_424075_middles.jpg',
        price : 129000,
        stock : 6,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      { 
        name: 'UT Minions2 Lengan Pendek', 
        image_url : 'https://deo-ecommerce-bucket.s3-ap-southeast-1.amazonaws.com/products/67_428458_middles.jpg',
        price : 149000,
        stock : 12,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      { 
        name: 'Ikat Pinggang Italian Leather Narrow', 
        image_url : 'https://deo-ecommerce-bucket.s3-ap-southeast-1.amazonaws.com/products/38_423844_middles.jpg',
        price : 399000,
        stock : 15,
        createdAt : new Date(),
        updatedAt : new Date()
      }
   ], {})
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Products', null, {})
  }
};
