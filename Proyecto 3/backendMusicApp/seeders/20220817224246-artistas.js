'use strict';

const mockDataArtista = require('../data_generator/artists.json');

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
    
    mockDataArtista.forEach(data => {
      dataUp.push({
        nombre: data.nombre,        
        foto: data.foto
      })      
    });   
    
    await queryInterface.bulkInsert('artista', dataUp, {});    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */  
    let sequelize = new Sequelize(require('../config/config.json').development);
    await queryInterface.bulkDelete('artista', null, {});    
    
    await sequelize.query("ALTER TABLE artista AUTO_INCREMENT = 1;");     
  }
};
