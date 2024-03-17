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

router.get("/img", (req, res) => {
  const user = req.query;
  const sql = "SELECT * FROM `cat` WHERE `cid` = ?";
  conn.query(sql, [user.id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving user data.");
    } else {
      console.log("Successfully executed query:", results);
      res.send(results);
    }
  });
});

router.get("/rankold", (req, res) => {
  const sql = `
  SELECT cid, MAX(score_new) AS max_score
  FROM vote
  WHERE DATE(date) = CURDATE() - INTERVAL 1 DAY
  GROUP BY cid
  ORDER BY max_score DESC
  LIMIT 10;
  

  


  
  `;

  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving vote data.");
    } else if (results.length < 10) {
      console.warn("Less than 10 results found. Consider increasing data or adding logic to handle this case.");
      res.send(results);
    } else {
      console.log("Successfully executed query:", results);
      res.send(results);
    }
  });
});

router.get("/ranktoday", (req, res) => {
  const sql = `
  SELECT * from cat order by score desc limit 10;
  `;

  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving vote data.");
    } else if (results.length < 10) {
      console.warn("Less than 10 results found. Consider increasing data or adding logic to handle this case.");
      res.send(results);
    } else {
      console.log("Successfully executed query:", results);
      res.send(results);
    }
  });
});


