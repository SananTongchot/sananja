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
//    router.get("/", (req, res) => {
//     // 1. Connect to the database (assuming a connection pool is established)
//     conn.getConnection((err, connection) => {
//       if (err) {
//         // Handle connection error gracefully
//         console.error("Error connecting to database:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//         return; // Exit the function if connection fails
//       }
//       const sql = `SELECT * FROM cat ORDER BY RAND() LIMIT 2`; // Use template literals for clarity
//       connection.query(sql, (error, result) => {
//         connection.release(); // Release the connection back to the pool
  
//       });
//     });
//   });
  