import express from "express";
import mysql from "mysql";
import axios from "axios";
export const router = express.Router();
import { conn } from "../dbconnect";
import { CatModel, UserModel } from "../model";
import bodyParser = require("body-parser");

router.put("/:id", (req, res) => {
  let cat: CatModel = req.body;
  let id = +req.params.id; // ใช้ req.params เพื่อดึงค่า id จาก URL parameter
  let newscore = +cat.score; // ใช้ req.body เพื่อดึงค่า newscore จาก request body

  let sql = "UPDATE `cat` SET `score`=? WHERE `id`=?";
  sql = mysql.format(sql, [newscore, id]);
  
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ affected_row: result.affectedRows });
  });
});

router.get("/:id", (req, res) => {
  const catID = req.params.id;
  const sql = "SELECT score FROM `cat` WHERE `id` = ?";
  
  conn.query(sql, [catID], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving user data.");
    } else {
      console.log("Successfully executed query:", results);
      res.send(results);
    }
  });
});
