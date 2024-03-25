import express from "express";
import mysql from "mysql";
import axios from "axios";
export const router = express.Router();
import { conn } from "../dbconnect";
import { CatModel, UserModel, VoteModel } from "../model";
import bodyParser = require("body-parser");

router.put("/:id", (req, res) => {
  let cat: CatModel = req.body;
  let id = +req.params.id; // ใช้ req.params เพื่อดึงค่า id จาก URL parameter
  let newscore = +cat.score; // ใช้ req.body เพื่อดึงค่า newscore จาก request body
  console.log("newScore"+newscore);
  let sql = "UPDATE `cat` SET `score`=? WHERE `id`=?";
  sql = mysql.format(sql, [newscore, id]);
  
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ affected_row: result.affectedRows });
  });
});

router.get("/:id", (req, res) => {
  const catID = req.params.id;
  const sql = "SELECT score,image,id FROM `cat` WHERE `id` = ?";
   
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



//เอาข้อมูลลงใน vote
// router.post("/", (req, res) => {
//   let vote: VoteModel = req.body;
//   let id = vote.id 

//   let newscore = +cat.score;           
//   let sql = "UPDATE `cat` SET `score`=? WHERE `id`=?";
//   sql = mysql.format(sql, [newscore]);
  
//   conn.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(201).json({ affected_row: result.affectedRows });
//   });
// });

router.post("/", (req, res) => {
  let vote: VoteModel = req.body;
  let sql =
    "INSERT INTO `vote`(`cid`, `score_old`, `score_new`, `date`) VALUES (?,?,?,now())";
  sql = mysql.format(sql, [
    vote.cid,
    vote.score_old,
    vote.score_new,
    vote.date,
    
  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});