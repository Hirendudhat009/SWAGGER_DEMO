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
    return queryInterface.bulkInsert('users', [{
      email: 'admin@agenkan.com',
      password: 'yourpasswordehre',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin@agenkan.com',
      password: 'yourpasswordehre',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin@agenkan.com',
      password: 'yourpasswordehre',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
