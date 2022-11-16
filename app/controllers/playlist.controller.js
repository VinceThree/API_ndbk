const db = require("../models");
const Playlist = db.playlist;
const Song =db.song;
const User =db.user;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: playlist } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, playlist, totalPages, currentPage };
};

// Create and Save a new Playlist
exports.create = (req, res) => {
    let songVar = req.body.songs;

    if(req.body.name && req.body.owner_id){
        Playlist.create({
            name:req.body.name,
            owner_id:req.body.owner_id,
            created_date:new Date()
        }).then(playlistEL => {
            console.log(playlistEL);
            songVar.forEach(song => {
                Song.findByPk(song.id).then(songEll => {
                    playlistEL.addSongs(songEll);
                })
            })

            res.send({message: "Playlist was created successfully."});
        })
            .catch(err => {
                console.log(err)
                res.status(500).send({
                    message: "Error creating Playlist with id"
                });
            });
    };
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    const { page, size, name } = req.query;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const { limit, offset } = getPagination(page, size);
    Playlist.findAndCountAll({
        include:[{
            model: Song,
            as: "songs_in_playlist"
             },
            {
                model: User,
                as: "follower_of_playlist"
            },
            {
                model: User, attributes:
                    ['name', 'gender', 'id',],
                as: 'owner'
            }
        ],
        where: condition, limit, offset
    })
        .then(data => {
            console.log(data);
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Playlist.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Playlist.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a Playlist with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Playlist.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "USer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

};


