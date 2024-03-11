import  express  from "express";
import path from "path";
import multer from "multer";

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
class FileMiddleware{
    filename = "";
    public readonly diskLoader = multer({

        storage: multer.memoryStorage(),

        limits:{
            fileSize: 67108864,
        },
    });
}

// const fileUpload = new FileMiddleware();
// router.post("/", fileUpload.diskLoader.single("file"), async (req, res) => {
//   const filename = Math.round(Math.random() * 10000) + ".png";
//   const storageRef = ref(storage,"/images/"+filename);
//   const metaData = await uplodeBytesResumable(storageRef,req.file!.buffer,metaData);
//  const url = await getDowloadURL(snapshot.ref);
//  res.status(200).json({filename:url});
// });
const fileUpload = new FileMiddleware();
router.post("/", fileUpload.diskLoader.single("file"), (req, res) => {
  res.json({ filename: "/uploads/" + fileUpload.filename });
});