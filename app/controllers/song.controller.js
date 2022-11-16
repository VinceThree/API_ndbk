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
    const { count: totalItems, rows: songs } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, songs, totalPages, currentPage };
};

// Create and Save a new Playlist
exports.create = (req, res) => {
    if(req.body.title && req.body.artist){
        Song.create(req.body).then(data => {
            res.send({message: "Song was created successfully."});
        })
            .catch(err => {
                res.status(500).send({
                    message: "Error creating Song with id"
                });
            });
    };
}

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    const { page, size, title , artist } = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    if (title && !artist ){
        var condition = { title: { [Op.like]: `%${title}%` } };
    }
    else if (artist && !title){
        var condition =  { artist: { [Op.like]: `%${artist}%` } };

    }
    else if (title && artist) {
        var condition = { title: { [Op.like]: `%${title}%` },artist: { [Op.like]: `%${artist}%` } };
    }
    const { limit, offset } = getPagination(page, size);

    Song.findAndCountAll({
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

    Song.findByPk(id)
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


    Song.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Song was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Song with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Song with id=" + id
            });
        });
};

// Delete a Song with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Song.findByPk(id).then(songEl => {
        songEl.destroy();
    })

};


// find all published Tutorial
//exports.findAllPublished = (req, res) => {
//    const { page, size } = req.query;
//    const { limit, offset } = getPagination(page, size);
//
//    Tutorial.findAndCountAll({ where: { published: true }, limit, offset })
//        .then(data => {
//            const response = getPagingData(data, page, limit);
//            res.send(response);
//        })
//        .catch(err => {
//            res.status(500).send({
//                message:
//                    err.message || "Some error occurred while retrieving tutorials."
//            });
//        });
//};
