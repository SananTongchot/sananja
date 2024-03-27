import express from "express";
import mysql from "mysql";
import axios from "axios";
export const router = express.Router();
import { conn } from "../dbconnect";
import { UserModel } from "../model";
import bodyParser = require("body-parser");


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

router.get("/1cat/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `cat` WHERE `id` = ?";
  conn.query(sql, [id], (err, results) => {
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
  SELECT c.id, c.name, c.image, c.score,
  ROW_NUMBER() OVER (ORDER BY c.score DESC) AS current_rank, 
  ROW_NUMBER() OVER (ORDER BY v.total_score_change DESC) AS ranking
  FROM (
      SELECT id, name, score, image
      FROM cat
      ORDER BY score DESC
      LIMIT 10
  ) c
  JOIN (
      SELECT cid, MAX(score_new - score_old) AS total_score_change
      FROM vote
      GROUP BY cid
  ) v ON c.id = v.cid
  ORDER BY current_rank;
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

// router.get("/ranktoday", (req, res) => {
//   const sql = `
//   SELECT * from cat order by score desc limit 10;
//   `;

//   conn.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       res.status(500).send("Error retrieving vote data.");
//     } else if (results.length < 10) {
//       console.warn("Less than 10 results found. Consider increasing data or adding logic to handle this case.");
//       res.send(results);
//     } else {
//       console.log("Successfully executed query:", results);
//       res.send(results);
//     }
//   });
// });

// router.get("/:id", (req, res) => {
//   let id = +req.params.id;
//   conn.query("select * from user where id = ?" , [id], (err, result, fields) => {
//   if (err) throw err;
//     res.json(result);
//   });
// });

router.put("/edituse/:id", (req, res) => {
  let id = +req.params.id;
  let user: UserModel = req.body;
  let sql =
    "UPDATE `user` SET `name`=?, `email`=?, `password`=? WHERE `id`=?";
  sql = mysql.format(sql, [
    user.name,
    user.email,
    user.password,
    id
  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(200) 
      .json({ affected_row: result.affectedRows });
  });
});


