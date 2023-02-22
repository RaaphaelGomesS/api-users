const jwt = require("jsonwebtoken");
const secret = "senha_secreta";

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];

    try {
      const decoded = jwt.verify(token, secret);
      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.json({ msg: "Você não tem permissão para essa rota!" });
      }
    } catch (error) {
      res.status(403);
      res.json({ msg: "Você não está autenticado" });
      return;
    }
  } else {
    res.status(403);
    res.json({ msg: "Você não está autenticado" });
    return;
  }
};
