var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/docs', function(req, res, next) {
  res.render('api', { title: 'API Docs' });
});

router.get('/docs/canciones', function(req, res, next) {
  res.render('cancionesAPI', { title: 'Canciones Docs' });
});

router.get('/docs/albumes', function(req, res, next) {
  res.render('albumesAPI', { title: 'Albumes Docs' });
});

router.get('/docs/artistas', function(req, res, next) {
  res.render('artistasAPI', { title: 'Artistas Docs' });
});

module.exports = router;
