import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "David_123",
    database:"knowledgebase",
})

/* export const db = mysql.createConnection({
    host: "localhost",
    user: "hpluscl_bk",
    password: "@}{86QQc-xBR",
    database:"hpluscl_bk",
}) */