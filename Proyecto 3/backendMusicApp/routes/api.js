var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);  


const admin = require('firebase-admin');
var serviceAccount = require("../musicapp-2fb10-firebase-adminsdk-ngksy-a38d6e69db.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: 'https://musicapp-2fb10-default-rtdb.firebaseio.com/' });

const db = admin.database();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/docs');
});

/* ARTISTAS */

/**
 * Obtiene los datos de todos los artistas
 */
router.get('/artistas', function(req, res, next){
  models.artista.findAll()
  .then(artista => res.json(artista))
  .catch(error => res.status(400).send(error));
});

/**
 * Obtiene los datos de cierto artista basado en su id
 */
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

/**
 * Ruta para obtener todos los albumes de la base de datos
 */
router.get('/albumes', function(req, res, next){
  models.album.findAll()
  .then(album => res.json(album))
  .catch(error => res.status(400).send(error));
});

/**
 * Ruta para obtener los datos de un album en especifico
 */
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

/* CANCIONES */

/**
 * Ruta para obtener los datos de una cancion basado en su id
 */
router.get('/cancion/:idCancion', async function(req, res, next) {
  let id = req.params.idCancion;
  let datos = await db.ref('collection').orderByKey().equalTo(id).once('value');
  datos = datos.toJSON();

  let idAlbum = datos[id.toString()]['album_id'];
  let album = await models.album.findOne({where:idAlbum});

  let datoCancion = {
    nombreCancion: datos[id].nombre,
    imagen: album.imagen,
    nombreAlbum:album.nombre,
    duracion:datos[id].duracion,
    url_cancion:datos[id].url_cancion,
    album_id:datos[id].album_id,    
    letra:datos[id].letra
  }

  res.json(datoCancion);
})

/**
 * Obtiene un arreglo con objetos json de los datos de canciones, se le puede indicar el maximo de canciones que puede enviar
 */
router.get('/canciones/max=:num', async function(req, res, next){
  let num = parseInt(req.params.num);
  let diccAlbumes = {};
  let albumes, datosCanciones;
  
  try {
    albumes = await models.album.findAll();
    datosCanciones = await db.ref('collection').orderByKey().limitToLast(num).once('value');
  } catch (error) {
    throw res.status(400).send(error);
  }

  albumes.forEach(album => diccAlbumes[album['id']] = { "imagen": album['imagen'], "nombre": album['nombre'] });

  let canciones = [];
  datosCanciones = datosCanciones.toJSON();

  for (const key in datosCanciones) {
    let elem = datosCanciones[key];
    canciones.push({
      id:key,          
      nombreCancion: elem['nombre'],
      nombreAlbum: diccAlbumes[elem['album_id']]['nombre'],
      imagen: diccAlbumes[elem['album_id']]['imagen'],
      duracion: elem['duracion']
    });
  }
  res.json(canciones);

});

/**
 * Obtiene las canciones pertenecientes a un album de cierto id
 */
router.get('/canciones/album/:albumId', function(req, res, next){
  let idAlbum = parseInt(req.params.albumId);

  models.album.findOne({where:{ id:idAlbum }})
  .then(album => {        
    db.ref('collection').orderByChild('album_id').equalTo(idAlbum).on('value', sn => {
      let canciones = [];
      let datosCanciones = sn.toJSON();

      for (const key in datosCanciones) {
        let elem = datosCanciones[key];
        canciones.push({
          id:key,                              
          nombreCancion: elem['nombre'],
          nombreAlbum: album['nombre'],
          imagen: album['imagen'],
          duracion: elem['duracion']
        });        
      }
      res.json(canciones);
    });
  })
  .catch(error => res.status(400).send(error));    
})

/**
 * Obtiene los datos de todas las canciones de cierto artista
 */
router.get('/canciones/:artistaId', async function(req, res, next){
  let id = parseInt(req.params.artistaId);

  let artistas, datosCanciones;

  try {
    artistas = await models.artista.findOne({ where:{id:id}, attributes:[],
        include:[{
          model:models.album,
          as:'albumesDeArtista',
          attributes:['id', 'nombre', 'imagen'],      
          through:{ attributes:[] }
        }]
      });
    datosCanciones = await db.ref('collection').once('value');
  } catch (error) {
    throw res.status(400).send(error);
  }

  let albumes = {};
  artistas['albumesDeArtista'].forEach(album => albumes[parseInt(album['id'])]={ "nombre":album['nombre'], "imagen":album['imagen']});

  let canciones = [];
  datosCanciones = datosCanciones.toJSON();      

  for (const key in datosCanciones) {
    let cancion = datosCanciones[key];
    if(Object.keys(albumes).includes(cancion['album_id'].toString())){
      canciones.push({
        id:key,
        nombreCancion:cancion['nombre'],             
        nombreAlbum: albumes[cancion['album_id']]["nombre"],
        imagen: albumes[cancion['album_id']]["imagen"],
        duracion: cancion['duracion']
      });
    }
  }
  res.json(canciones);
});


module.exports = router;
