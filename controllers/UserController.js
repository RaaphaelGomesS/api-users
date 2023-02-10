var User = require("../services/User.js");

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
      res.json({ msg: "Usuário não foi encontrado" });
    } else {
      res.status(200);
      res.json(user);
    }
  }

  async create(req, res) {
    const { email, name, password } = req.body;

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
      await User.new(email, name, password);
      res.status(200);
      res.json({ msg: "Usuário criado!" });
    }
  }
}

module.exports = new UserController();
