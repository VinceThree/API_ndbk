module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define("song", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING
        },
        artist: {
            type: Sequelize.STRING
        }
    });

    return Song;
};