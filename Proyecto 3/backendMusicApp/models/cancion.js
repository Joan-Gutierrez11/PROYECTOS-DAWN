const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cancion', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    letra: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url_cancion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    album_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'album',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'cancion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "album_id" },
        ]
      },
      {
        name: "fk_cancion_album_idx",
        using: "BTREE",
        fields: [
          { name: "album_id" },
        ]
      },
    ]
  });
};
