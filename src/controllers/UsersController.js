const AppError = require("../utils/AppError")
const database = require("../database/sqlite")
const sqliteConnection = require("../database/sqlite")
const { hash, compare} = require("bcryptjs")


class UsersController {
    async create(request, response ) {
        const { name, email , password} = request.body
       const database = await sqliteConnection()
       const checkUserExists = await database.get(
        "SELECT * FROM users WHERE email = (?)",
  
        
        [email]
      );
    
      if(checkUserExists) {
        throw new AppError("este email ja esta em uso")
      }

      const hashedPassword = await hash(password,8)

      await database.run("INSERT INTO users (name, email , password) VALUES (?, ?, ?)", 
      [name, email, hashedPassword])

        response.status(200).json()
    
    }


    
  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM USERS WHERE id = (?)", [id]); // vai buscar o id no banco de dados recebendo o id do request params
      if(!user) {
        throw new AppError("Usuário não encontrado");
      }

    const userWithUpdatedEmail = await database.get("SELECT * FROM USERS WHERE email = (?)", [email]); // vai buscar o email  no banco de dados recebendo o email do request.body e pegar o email do usuário

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Email já está em uso")
    }
 
 
    user.name = name;
   user.email = email;

   if (password && !old_password) {
    throw new AppError ("Informe sua senha antiga")
   }

   if (password && old_password) {
    const checkOldPassword = await compare(old_password, user.password)
    if (!checkOldPassword){
      throw new AppError("A senha não confere")
    }
    user.password = await hash( password, 8)
   }

   await database.run(`
   UPDATE users SET
   name = ?,
   email = ?,
   password = ?,
   updated_at = ?
   WHERE id = ?`,
   [user.name, user.email, user.password, new Date(), id]);
   return response.status(200).json();
  }

  
}

module.exports = UsersController