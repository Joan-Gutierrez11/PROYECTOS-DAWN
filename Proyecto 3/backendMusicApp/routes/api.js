var express = require('express');
const artista = require('../models/artista.js');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* ARTISTAS */

router.get('/artistas', function(req, res, next){
  models.artista.findAll()
  .then(artista => res.json(artista))
  .catch(error => res.status(400).send(error));
});

router.get('/artistas/:id', function(req, res, next){
  let idArtista = parseInt(req.params.id);

  models.artista.findOne({
    where:{id:idArtista},
    include:[{
      model:models.album,
      as:'albumesDeArtista',
      through:{
        attributes:[]
      }            
    }]
  })
  .then(artista => res.json(artista))
  .catch(error => res.status(400).send(error));
});

/* ALBUMES */

router.get('/albumes', function(req, res, next){
  models.album.findAll()
  .then(album => res.json(album))
  .catch(error => res.status(400).send(error));
});

router.get('/albumes/:id', function(req, res, next){
  let idAlbum = parseInt(req.params.id);

  models.album.findOne({
    where:{id:idAlbum},
    include:[{
      model:models.artista,
      as:'artistasDelAlbum',
      through:{
        attributes:[]
      }
    }]
  })
  .then(album => res.json(album))
  .catch(error => res.status(400).send(error));
});


module.exports = router;
