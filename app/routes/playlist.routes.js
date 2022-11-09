const playlist = require("../controllers/playlist.controller.js");
module.exports = app => {
    const playlist = require("../controllers/playlist.controller.js");

    var router = require("express").Router();

    // Create a new playlist
    router.post("/", playlist.create);

    // Retrieve all playlist
    router.get("/", playlist.findAll);

    // Retrieve a single playlist with id
    router.get("/:id", playlist.findOne);

    // Update a playlist with id
    router.put("/:id", playlist.update);

    // Delete a playlist with id
    router.delete("/:id", playlist.delete);

    app.use('/api/playlists', router);
};
