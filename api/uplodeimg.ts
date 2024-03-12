import  express  from "express";
import path from "path";
import multer from "multer";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { CatModel, UserModel } from "../model";
import { ref,getStorage,uploadBytesResumable,getDownloadURL}from "firebase/storage";
import { initializeApp } from "firebase/app";
export const router = express.Router();

const firebaseConfig = {
    apiKey: "AIzaSyBKcHxXogeiPpk7TeZ59Iy4MkVB0USXuDU",
    authDomain: "project-cat-ce497.firebaseapp.com",
    projectId: "project-cat-ce497",
    storageBucket: "project-cat-ce497.appspot.com",
    messagingSenderId: "642854552388",
    appId: "1:642854552388:web:98fc671344caa0c15f0d11",
    measurementId: "G-1W01CEDWMM"
  };

 initializeApp(firebaseConfig); 
 
 const storage = getStorage();
class FileMiddleware{
    filename = "";

    public readonly diskLoader = multer({

        storage: multer.memoryStorage(),

        limits:{
            fileSize: 67108864,
        },
    });
}



const fileUpload = new FileMiddleware();
router.post("/img", fileUpload.diskLoader.single("file"), async (req, res) => {
    try {
      const filename = Math.round(Math.random() * 10000) + ".png";
      const storageRef = ref(storage, "/images/" + filename);
      const metaData = { contentType: req.file!.mimetype };
      const snapshot = await uploadBytesResumable(storageRef, req.file!.buffer, metaData);
      const url = await getDownloadURL(snapshot.ref);
  
      // Insert the filename into the database
      const sql = "INSERT INTO `cat` (`image`) VALUES (?)";
      const insertSql = mysql.format(sql, [url]);
  
      conn.query(insertSql, (err, result) => {
        if (err) {
          console.error('Error inserting filename into the database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ filename: url, dbResult: result });
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// router.post("/img", fileUpload.diskLoader.single("file"), async (req, res) => {
//   const filename = Math.round(Math.random() * 10000) + ".png";
//   const storageRef = ref(storage,"/images/"+filename);
//   const metaData = {contentType : req.file!.mimetype};
//   const snapshot = await uploadBytesResumable(storageRef,req.file!.buffer,metaData);
//  const url = await getDownloadURL(snapshot.ref);
//   res.status(200).json({filename:url});
//   const img = res.status(200).json({filename:url});

//   const sql = "INSERT INTO `cat` (`image`) VALUES (?)";
//   const insertSql = mysql.format(sql, [url]);

//   conn.query(insertSql, (err, result) => {
//     if (err) {
//       console.error('Error inserting filename into the database:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.status(200).json({ filename: url, dbResult: result });
//     }
//   });
// });

// router.post("/insert", async (req, res) => {
//     try {
//       const img: CatModel = req.body;
//       const filename = req.body.filename; // Assuming you are sending the filename along with other data
  
//       // Insert the filename into the database
//       const sql = "INSERT INTO `cat` (`image`) VALUES (?)";
//       const inserts = [filename]; // Adjust this according to your database schema
  
//       conn.query(sql, inserts, (err, result) => {
//         if (err) {
//           console.error("Error inserting data into database:", err);
//           return res.status(500).json({ error: "Internal Server Error" });
//         }
  
//         // Respond with success status and inserted data
//         res.status(201).json({
//           success: true,
//           affected_row: result.affectedRows,
//           last_idx: result.insertId,
//         });
//       });
//     } catch (error) {
//       console.error("Error handling insert request:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });
  
  



