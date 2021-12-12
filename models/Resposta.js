const Sequelize = require("sequelize");
const connection = require("../database/database");

const Resposta = connection.define("respostas", {
  id_resposta: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Resposta.sync({ force: false }).then(() => {
  console.log("Tabela criada!");
});

module.exports = Resposta;
