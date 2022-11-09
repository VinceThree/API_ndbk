module.exports = (sequelize, Sequelize) => {
    const Playlist = sequelize.define("playlist", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        create_date: {
            type: Sequelize.DATE
        }
    });

    return Playlist;
};