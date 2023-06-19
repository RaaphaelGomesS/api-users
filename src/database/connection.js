import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
  },
};

const myKnex = knex(config);

export default myKnex;
