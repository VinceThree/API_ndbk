const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playlist_follower', {
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'playlist',
        key: 'id'
      }
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'playlist_follower',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "playlist_id" },
          { name: "follower_id" },
        ]
      },
      {
        name: "fk_pf_follower_id",
        using: "BTREE",
        fields: [
          { name: "follower_id" },
        ]
      },
    ]
  });
};
