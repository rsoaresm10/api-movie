require("express-async-errors") // importando extensão de erros

const migrationsRun = require("./database/sqlite/migrations")
const express = require("express");// requisição do express
const app = express();//inicializando o express
app.use(express.json());
const routes = require("./routes");
app.use(routes);

migrationsRun();



const AppError = require("./utils/AppError")
app.use((error, request, response, next) => { //  erro causado pelo cliente 
    if(error instanceof AppError)  {// Se a instancia do error for igaul ao AppErro, o erro foi por parte do cliente 
    return response.status(error.statusCode).json({
         status: "erro",
        message: error.message
    })
     }
     console.error(error);
     return response.status(500).json({ // se não for um erro por parte do cliente, vai ser um erro do servidor
        status: "error", 
        message: "Internal server error",
    })

    })

const port = 3330


app.listen(port,() => console.log(`server is running on port ${port}`));

