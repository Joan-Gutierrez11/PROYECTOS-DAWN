'use strict';

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert('album_artista', [{
        album_id: random(1, 10),
        artista_id: random(1, 10)
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('album_artista', null, {});
  }
};
