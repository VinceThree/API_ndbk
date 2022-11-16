const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const {initModels} = require("./init-models");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./user.js")(sequelize, Sequelize);
db.song = require("./song.js")(sequelize, Sequelize);
db.playlist = require("./playlist.js")(sequelize, Sequelize);
db.song_has_playlist = require("./song_has_playlist")(sequelize,Sequelize);
db.playlist_follower = require("./playlist_follower")(sequelize,Sequelize);

db.playlist.belongsToMany(db.song, { as: 'songs_in_playlist', through: db.song_has_playlist, otherKey: "song_id", foreignKey: "playlist_id" });
db.playlist.belongsToMany(db.user, { as: 'follower_of_playlist', through: db.playlist_follower, foreignKey: "playlist_id", otherKey: "follower_id" });

db.song.belongsToMany(db.playlist, {  through: db.song_has_playlist,  foreignKey: "song_id" });
db.playlist.belongsToMany(db.song, {through: db.song_has_playlist,  foreignKey: "playlist_id"})

db.playlist.belongsTo(db.user, {as: "owner", foreignKey : 'owner_id'});
db.user.hasMany(db.playlist, { as: "playlists", foreignKey: "id"});




module.exports = db;



