import { Router } from "express";
import uploadCon from "./../controllers/upload-con.js";

const uploadRouter = Router();

uploadRouter.get("/", uploadCon.get);

export default uploadRouter;