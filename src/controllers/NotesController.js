const knex = require("../database/knex")

class NotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.params;

        const notes_id = await knex("notes").insert({
            title, 
            description,
            rating,
            user_id


        })

        const tagsInsert = await tags.map(name => {
            return {
            name,
            notes_id,
            user_id
            }
        });

        await knex("tags").insert(tagsInsert)

        response.json("tudo ok")
    }


    async show (request, response) {
        const { id } = request.params;
        const notes = await knex("notes").where({id}).first()
        const tags = await knex("tags").where({notes_id: id}).orderBy("name")
    
        return response.json({
          ...notes,
            tags
        })
      }

      async delete(request, response) {
        const { id } = request.params;
        const notes = await knex("notes").where({id}).delete()
        response.json("deletado")
      }


      async index (request, response) {
        const  {title,  user_id, tags } = request.query;
        let notes;

        if(tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());//converteu o texto em array, usando a , como delimitador
            notes = await knex("tags")
            .whereIn("name", filterTags)
        } else{
            notes = await knex("notes")
        .where({ user_id, })
        .whereLike("title", `%${title}%`) // busca por valores que contenham dentro de uma palavra, concatenou para que ele busque em todas as partes do title 
        .orderBy("title")
        }

        
         

        return response.json(notes);
      }

    }


    module.exports = NotesController