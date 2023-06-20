import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function (req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.json({ err: "Você não tem permissão para essa rota!" });
      }
    } catch (error) {
      res.status(403);
      res.json({ err: "Você não está autenticado" });
      return;
    }
  } else {
    res.status(403);
    res.json({ err: "Você não está autenticado" });
    return;
  }
}
