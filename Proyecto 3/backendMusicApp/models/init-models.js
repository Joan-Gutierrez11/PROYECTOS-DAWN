var DataTypes = require("sequelize").DataTypes;
var _album = require("./album");
var _album_artista = require("./album_artista");
var _artista = require("./artista");
var _cancion = require("./cancion");

function initModels(sequelize) {
  var album = _album(sequelize, DataTypes);
  var album_artista = _album_artista(sequelize, DataTypes);
  var artista = _artista(sequelize, DataTypes);
  var cancion = _cancion(sequelize, DataTypes);

  album.belongsToMany(artista, { as: 'artistasDelAlbum', through: album_artista, foreignKey: "album_id", otherKey: "artista_id" });
  artista.belongsToMany(album, { as: 'albumesDeArtista', through: album_artista, foreignKey: "artista_id", otherKey: "album_id" });

  album_artista.belongsTo(album, { as: "album", foreignKey: "album_id"});
  album.hasMany(album_artista, { as: "album_artista", foreignKey: "album_id"});
  
  cancion.belongsTo(album, { as: "albumPerteneciente", foreignKey: "album_id"});
  album.hasMany(cancion, { as: "cancionesAlbum", foreignKey: "album_id"});
  
  album_artista.belongsTo(artista, { as: "artistum", foreignKey: "artista_id"});
  artista.hasMany(album_artista, { as: "album_artista", foreignKey: "artista_id"});

  return {
    album,
    album_artista,
    artista,
    cancion,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
