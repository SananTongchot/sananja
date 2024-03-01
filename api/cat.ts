import express from "express";
import mysql from "mysql";
export const router = express.Router();
import { conn } from "../dbconnect";

//show all
router.get("/", (req, res) => {
  const sql = "SELECT * FROM cat";
  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      // Send user-friendly error message to client
      res.status(500).send("Error retrieving user data.");
    } else {
      console.log("Successfully executed query:", results);
      res.send(results); // Send retrieved user data
    }
  });
});


// register
router.post("/register", (req, res) => {
  res.send("Get in trip.ts");
});