import express from "express";
import mysql from "mysql";
import axios from "axios";
export const router = express.Router();
import { conn } from "../dbconnect";
import { UserModel } from "../model";
import bodyParser = require("body-parser");

//show all
// router.get("/", (req, res) => {
//   let user: UserModel = req.body;
//   const sql = "SELECT * FROM `user` WHERE `name` = ? AND `password` = ?";
//   conn.query(sql, [user.name, user.password], (err, results) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       // Send user-friendly error message to client
//       res.status(500).send("Error retrieving user data.");
//     } else {
//       console.log("Successfully executed query:", results);
//       res.send(results); // Send retrieved user data
//     }
//   });
// });
router.get("/", (req, res) => {
  const user = req.query;
  const sql = "SELECT * FROM `user` WHERE `name` = ? AND `password` = ?";
  conn.query(sql, [user.name, user.password], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving user data.");
    } else {
      console.log("Successfully executed query:", results);
      res.send(results);
    }
  });
});
///


// register
router.post("/register", (req, res) => {
  let user: UserModel = req.body;
  let sql =
    "INSERT INTO `user`(`name`, `avatar`, `email`, `password`, `type`) VALUES (?,?,?,?,?)";
  sql = mysql.format(sql, [
    user.name,
    user.avatar,
    user.email,
    user.password,
    user.type,
  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});

// router.get("/random", (req, res) => {
//   // 1. Connect to the database (assuming a connection pool is established)
//   conn.getConnection((err, connection) => {
//     if (err) {
//       // Handle connection error gracefully
//       console.error("Error connecting to database:", err);
//       res.status(500).json({ message: "Internal Server Error" });
//       return; // Exit the function if connection fails
//     }
//     const sql = `SELECT * FROM cat ORDER BY RAND() LIMIT 2`; // Use template literals for clarity
//     connection.query(sql, (error, result) => {
//       connection.release(); // Release the connection back to the pool

//     });
//   });
// });