import express from "express";
import mysql from "mysql";
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