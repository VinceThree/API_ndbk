var DataTypes = require("sequelize").DataTypes;
var _playlist = require("./playlist");
var _playlist_follower = require("./playlist_follower");
var _playlist_song = require("./playlist_song");
var _song = require("./song");
var _song_has_playlist = require("./song_has_playlist");
var _user = require("./user");

function initModels(sequelize) {
  var playlist = _playlist(sequelize, DataTypes);
  var playlist_follower = _playlist_follower(sequelize, DataTypes);
  var playlist_song = _playlist_song(sequelize, DataTypes);
  var song = _song(sequelize, DataTypes);
  var song_has_playlist = _song_has_playlist(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  playlist.belongsToMany(song, { as: 'playlist_id_songs', through: song_has_playlist, foreignKey: "song_id", otherKey: "playlist_id" });
  playlist.belongsToMany(user, { as: 'follower_id_users', through: playlist_follower, foreignKey: "playlist_id", otherKey: "follower_id" });
  song.belongsToMany(playlist, { as: 'song_id_playlists', through: song_has_playlist, foreignKey: "playlist_id", otherKey: "song_id" });
  user.belongsToMany(playlist, { as: 'playlist_id_playlists', through: playlist_follower, foreignKey: "follower_id", otherKey: "playlist_id" });
  playlist_follower.belongsTo(playlist, { as: "playlist", foreignKey: "playlist_id"});
  playlist.hasMany(playlist_follower, { as: "playlist_followers", foreignKey: "playlist_id"});
  song_has_playlist.belongsTo(playlist, { as: "song", foreignKey: "song_id"});
  playlist.hasMany(song_has_playlist, { as: "song_has_playlists", foreignKey: "song_id"});
  playlist_song.belongsTo(song, { as: "song", foreignKey: "song_id"});
  song.hasMany(playlist_song, { as: "playlist_songs", foreignKey: "song_id"});
  song_has_playlist.belongsTo(song, { as: "playlist", foreignKey: "playlist_id"});
  song.hasMany(song_has_playlist, { as: "song_has_playlists", foreignKey: "playlist_id"});
  playlist.belongsTo(user, { as: "owner", foreignKey: "owner_id"});
  user.hasMany(playlist, { as: "playlists", foreignKey: "owner_id"});
  playlist_follower.belongsTo(user, { as: "follower", foreignKey: "follower_id"});
  user.hasMany(playlist_follower, { as: "playlist_followers", foreignKey: "follower_id"});

  return {
    playlist,
    playlist_follower,
    playlist_song,
    song,
    song_has_playlist,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
