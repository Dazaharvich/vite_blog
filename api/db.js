import mysql from "mysql2";
import dotenv from "dotenv";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "David_123",
    database:"knowledgebase",
})

/* dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}); */