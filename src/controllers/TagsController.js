const knex = require("../database/knex")

class TagsController {
    async show(request, response) {
        const { id } = request.params;
        const tags = await knex("tags").where({notes_id: id})
        return response.json({tags})
    }
}

module.exports = TagsController
