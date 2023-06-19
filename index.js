import express from "express";
import router from "./src/routes/routes.js";

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.listen(3000, () => {
  console.log("Servidor rodando");
});
