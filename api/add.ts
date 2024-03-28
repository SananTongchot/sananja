import express from "express";
import mysql from "mysql";
import mysql2 from "mysql";
export const router = express.Router();
import { conn } from "../dbconnect";
import { CatModel } from "../model";
import bodyParser = require("body-parser");

router.post("/", (req, res) => {
    let user: CatModel = req.body;
    let sql =
      "INSERT INTO `cat`(`name`, `image`, `score`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
      user.name,
      user.image,
      user.score,
    
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });

  router.put("/img", async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const avatar = req.body.avatar;
    const password = req.body.password;

    const updateSql = "UPDATE `user` SET `avatar` = ?, `name` = ?, `email` = ?, `password` = ? WHERE `id` = ?";
    const updateQuery = mysql.format(updateSql, [avatar, name, email, password, id]);

    conn.query(updateQuery, (updateErr, updateResult) => {
        if (updateErr) {
            console.error('Error updating user data in the database:', updateErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ dbResult: updateResult });
    });
});

router.put("/img3", async (req, res) => {
  const cat: CatModel = req.body;

  // Escape user input (assuming you're using mysql2)
  const escapedName = mysql2.escape(cat.name);
  const escapedId = mysql2.escape(cat.id);

  const updateSql = "UPDATE `cat` SET `image` = ?, `name` = ? WHERE `id` = ?";

  try {
    const updateQuery = conn.query(updateSql, [cat.image, escapedName, escapedId]);
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating user data in the database:', error);
    // Check error code or message for more specific response
    res.status(500).json({ error: 'An error occurred during update' });
  }
});
router.get("/score", (req, res) => {
  const user = req.query;
  const sql = "SELECT * FROM `vote` WHERE `cid` = ? AND DATE(date) = CURRENT_DATE();";
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

router.get("/score1", (req, res) => {
  const user = req.query;
  const sql = "SELECT * FROM `vote` WHERE `cid` = ? AND DATE(date) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY);";
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

router.get("/score2", (req, res) => {
  const user = req.query;
  const sql = "SELECT * FROM `vote` WHERE `cid` = ? AND DATE(date) = DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY);";
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

router.get("/score3", (req, res) => {
  const user = req.query;
  const sql = "SELECT * FROM `vote` WHERE `cid` = ? AND DATE(date) = DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY);";
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
router.get("/score4", (req, res) => {
  const user = req.query;
  const sql = "SELECT * FROM `vote` WHERE `cid` = ? AND DATE(date) = DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY);";
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

router.get("/score5", (req, res) => {
  const user = req.query;
  const sql = "SELECT * FROM `vote` WHERE `cid` = ? AND DATE(date) = DATE_SUB(CURRENT_DATE(), INTERVAL 5 DAY);";
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


router.get("/score6", (req, res) => {
  const user = req.query;
  const sql = "SELECT * FROM `vote` WHERE `cid` = ? AND DATE(date) = DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY);";
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

