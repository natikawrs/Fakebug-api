"use strict";

const { FRIEND_ACCEPTED } = require("../config/constants");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("friends", [
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 3,
        accepter_id: 5
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 18,
        accepter_id: 3
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 3,
        accepter_id: 22
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 11,
        accepter_id: 3
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 3,
        accepter_id: 15
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkInsert("friends", null, {});
  }
};
