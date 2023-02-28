class AppError {
    message; //dessa forma as propriedades ficam disponiveis dentro de toda a classe
    statusCode; //dessa forma as propriedades ficam disponiveis dentro de toda a classe

    constructor(message, statusCode = 400) {
        this.message  = message // está repassando o message que vai chegar atrves o constructor para o escopo global
        this.statusCode = statusCode
    }
}

module.exports = AppError