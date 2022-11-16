const song = require("../controllers/song.controller.js");
module.exports = app => {
    const song = require("../controllers/song.controller.js");

    var router = require("express").Router();

    // Create a new playlist
    router.post("/", song.create);

    // Retrieve all playlist
    router.get("/", song.findAll);

    // Retrieve a single playlist with id
    router.get("/:id", song.findOne);

    // Update a playlist with id
    router.put("/:id", song.update);

    // Delete a playlist with id
    router.delete("/:id", song.delete);

    app.use('/api/songs', router);
};
