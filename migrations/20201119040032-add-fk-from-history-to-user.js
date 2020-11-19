'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addConstraint('Histories', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk-from-history-to-user',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('Histories', 'fk-from-history-to-user')
  }
};
