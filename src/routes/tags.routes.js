const { Router } = require("express");

const tagsRoutes = Router();

const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()

tagsRoutes.get("/:id", tagsController.show)



module.exports = tagsRoutes
