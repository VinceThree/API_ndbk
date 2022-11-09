const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('song_has_playlist', {
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'playlist',
        key: 'id'
      }
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'song',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'song_has_playlist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "song_id" },
          { name: "playlist_id" },
        ]
      },
      {
        name: "fk_sp_playlist_id",
        using: "BTREE",
        fields: [
          { name: "playlist_id" },
        ]
      },
    ]
  });
};
