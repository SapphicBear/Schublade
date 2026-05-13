import { Router } from "express";
import uploadCon from "./../controllers/upload-con.js";
import upload from "./../data/multer.js";

const uploadRouter = Router();

uploadRouter.get("/", uploadCon.get);
// uploadRouter.post("/", upload.single("test"));

export default uploadRouter;