const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('album_artista', {
    album_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'album',
        key: 'id'
      }
    },
    artista_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'artista',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'album_artista',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "album_id" },
          { name: "artista_id" },
        ]
      },
      {
        name: "fk_album_has_artista_artista1_idx",
        using: "BTREE",
        fields: [
          { name: "artista_id" },
        ]
      },
      {
        name: "fk_album_has_artista_album1_idx",
        using: "BTREE",
        fields: [
          { name: "album_id" },
        ]
      },
    ]
  });
};
