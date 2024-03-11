import express from "express";
import mysql from "mysql";
import axios from "axios";
import { conn } from "../dbconnect";
import { UserModel } from "../model";
import bodyParser = require("body-parser");

export const router = express.Router();


router.get("/",(req,res)=>{
    const sql = `SELECT * FROM cat ORDER BY RAND() LIMIT 2`;
   conn.query(sql,(err,result)=>{
    if(err) throw err;
    res.status(200).json(result);
   });
   });

   router.get("/id", (req, res) => {
    const { name, password } = req.query; 
    const sql = `SELECT * FROM user WHERE name = ? AND password = ?`;
    conn.query(sql, [name, password], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
  
      res.status(200).json(result);
    });
  });
  