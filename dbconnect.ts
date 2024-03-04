import mysql from "mysql";

export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "202.28.34.197",
  user: "web66_65011212209",
  password: "65011212209@csmsu",
  database: "web66_65011212209",
});