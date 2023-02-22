var knex = require("../database/connection.js");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken.js");

class User {
  async findAll() {
    try {
      const result = await knex
        .select(["id", "email", "role", "name"])
        .table("users");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    try {
      const result = await knex
        .select(["id", "email", "role", "name"])
        .where({ id: id })
        .table("users");
      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async findByEmail(email) {
    try {
      const result = await knex
        .select(["id", "email", "role", "name"])
        .where({ email: email })
        .table("users");
      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

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

  async update(id, email, name, role) {
    const user = await this.findById(id);

    if (user != undefined) {
      const editUser = {};

      if (email != undefined) {
        if (email != user.email) {
          const result = await this.findEmail(email);
          if (result == false) {
            editUser.email = email;
          } else {
            return { status: false, err: "O email já está cadastrado!" };
          }
        }

        if (name != undefined) {
          editUser.name = name;
        }

        if (role != undefined) {
          editUser.role = role;
        }
        try {
          await knex.update(editUser).where({ id: id }).table("users");
          return { status: true };
        } catch (error) {
          return { status: false, error };
        }
      } else {
        return { status: false, err: "O usuário não existe!" };
      }
    }
  }

  async delete(id) {
    const user = await this.findById(id);
    if (user != undefined) {
      try {
        await knex.delete().where({ id: id }).table("users");
        return { status: true };
      } catch (error) {
        return { status: false, err: err };
      }
    } else {
      return { status: false, err: "O usuário não existe!" };
    }
  }

  async changePassword(newPassword, id, token) {
    var hash = await bcrypt.hash(newPassword, 10);

    await knex.update({ password: hash }).where({ id: id }).table("users");
    await PasswordToken.setUsed(token);
  }
}

module.exports = new User();
