import User from "../services/User.js";
import PasswordToken from "../services/PasswordToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    res.json(users);
  }

  async findUser(req, res) {
    const id = req.params.id;

    const user = await User.findById(id);
    if (user == undefined) {
      res.status(404);
      res.json({ err: "Usuário não foi encontrado" });
    } else {
      res.status(200);
      res.json(user);
    }
  }

  async create(req, res) {
    const { email, password, name, role } = req.body;

    if (email == undefined) {
      res.status(400);
      res.json({ err: "o e-mail é inválido!" });
      return;
    }

    const emailExist = await User.findEmail(email);

    if (emailExist) {
      res.status(406);
      res.json({ err: "o email já está cadastrado!" });
    } else if (emailExist == false) {
      await User.new(email, password, name, role);
      res.status(200);
      res.json({ msg: "Usuário criado!" });
    }
  }

  async edit(req, res) {
    const { id, email, name, role } = req.body;
    const result = await User.update(id, email, name, role);

    if (result != undefined) {
      if (result.status) {
        res.json({ msg: "Conta alterada!", user: result.user });
      } else {
        res.status(406);
        res.json({ err: result.err });
      }
    } else {
      res.status(406);
      res.json({ err: "Ocorreu um erro no servidor" });
    }
  }

  async remove(req, res) {
    var id = req.params.id;

    const result = await User.delete(id);
    if (result.status) {
      res.status(200);
      res.json({ msg: "Deletado com sucesso!" });
    } else {
      res.status(406);
      res.json({ err: result.err });
    }
  }

  async recoverPassword(req, res) {
    const email = req.body.email;
    const result = await PasswordToken.create(email);

    if (result.status) {
      res.status(200);
      res.json({ token: "" + result.token });
    } else {
      res.status(406);
      res.json({ err: result.err });
    }
  }

  async changePassword(req, res) {
    var token = req.body.token;
    var password = req.body.password;

    var isTokenValid = await PasswordToken.validate(token);

    if (isTokenValid.status) {
      await User.changePassword(
        password,
        isTokenValid.token.user_id,
        isTokenValid.token.token
      );
      res.status(200);
      res.json({ msg: "senha alterada!" });
    } else {
      res.status(406);
      res.json({ msg: "Token inválido!" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);

    if (user != undefined) {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.SECRET
        );

        res.status(200);
        res.json({ token: token });
      } else {
        res.status(406);
        res.json({ msg: "Senha incorreta" });
      }
    } else {
      res.json({ status: false });
    }
  }
}

export default new UserController();
