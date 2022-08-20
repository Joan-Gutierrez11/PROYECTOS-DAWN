'use strict';

const mockDataAlbum = require('../data_generator/datosAlbum.json')

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
    
    mockDataAlbum.forEach(data => {
      dataUp.push({
        nombre: data.nombre,
        fecha_publicacion: new Date(data.fecha_publicacion),
        imagen: data.imagen
      })      
    });      

    await queryInterface.bulkInsert('album', dataUp, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */    
    let sequelize = new Sequelize(require('../config/config.json').development);
    await queryInterface.bulkDelete('album', null, {});     
    
    await sequelize.query("ALTER TABLE album AUTO_INCREMENT = 1;");    
  }
};
