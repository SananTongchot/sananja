import express from "express";
import mysql from "mysql";
import axios from "axios";
export const router = express.Router();
import { conn } from "../dbconnect";
import { UserModel } from "../model";

router.get("/adminuser", (req, res) => {
  const sql = "SELECT * FROM `user` where `type` = 'use' ";
  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving user data.");
    } else {
      console.log("Successfully executed query:", results);
      res.send(results);
    }
  });
});
router.post("/getIMG",(req,res)=>{
  const uid=req.body.uid;
  const sql="SELECT id, name, image, score, ROW_NUMBER() OVER (ORDER BY score DESC)  AS ranking FROM cat WHERE cid = ?";
  conn.query(sql,[uid], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving user data.");
    } else {
      console.log("Successfully executed query:", results);
      res.send(results);
    }
  });
})

