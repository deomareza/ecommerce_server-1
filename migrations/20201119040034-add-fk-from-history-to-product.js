'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Histories', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'fk-from-history-to-product',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Histories', 'fk-from-history-to-product')
  }
};
