import express from "express";
import mysql from "mysql";
export const router = express.Router();
import { conn } from "../dbconnect";
import { UserModel } from "../model";
import bodyParser = require("body-parser");

router.delete("/:id", (req, res) => {
  const id = req.params.id; // Get id from URL parameter
  conn.query("DELETE FROM cat WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err); // Log the error
      return res.status(500).json({ error: 'Failed to delete data' }); // Respond with error message
    }
    res.status(200).json({ affectedRows: result.affectedRows }); // Respond with success message
  });
});



