var knex = require("../database/connection.js");
var bcrypt = require("bcrypt");

class User {
  async new(email, password, name) {
    try {
      var hash = await bcrypt.hash(password, 10);

      await knex
        .insert({ email, password: hash, name, role: 0 })
        .table("users");
    } catch (err) {
      console.log(err);
    }
  }

  async findEmail(email) {
    try {
      var resultado = await knex
        .select("*")
        .from("users")
        .where({ email: email });

      if (resultado.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(err);
      return false;
    }
  }
}

module.exports = new User();
