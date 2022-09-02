'use strict';

const mockData = require('../data_generator/albums_artists.json');

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
    let dataUp = []
  
    mockData.forEach(data => {      
      dataUp.push({
        album_id: parseInt(data.album_id),        
        artista_id: parseInt(data.artista_id)
      });      
    });   
    
    await queryInterface.bulkInsert('album_artista', dataUp, {});
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
