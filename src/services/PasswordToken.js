import knex from "../database/connection.js";
import User from "./User.js";

class PasswordToken {
  async create(email) {
    const user = await User.findByEmail(email);

    if (user != undefined) {
      try {
        var token = Date.now();

        await knex
          .insert({
            user_id: user.id,
            used: 0,
            token: token,
          })
          .table("passwordtokens");

        return { status: true, token: token };
      } catch (error) {
        console.log(error);
        return { status: false, err: err };
      }
    } else {
      return { status: false, err: "O e-mail não existe no banco!" };
    }
  }

  async validate(token) {
    try {
      var result = await knex
        .select()
        .where({ token: token })
        .table("passwordtokens");

      if (result.length > 0) {
        var tk = result[0];
        if (tk.used) {
          return { status: false };
        } else {
          return { status: true, token: tk };
        }
      } else {
        return { status: false };
      }
    } catch (error) {
      return { status: false };
    }
  }

  async setUsed(token) {
    await knex
      .update({ used: 1 })
      .where({ token: token })
      .table("passwordtokens");
  }
}

export default new PasswordToken();
