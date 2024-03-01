import mysql from "mysql";

export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "27.254.96.236",
  user: "web66_65011212069",
  password: "65011212069",
  database: "web66_65011212069",
});