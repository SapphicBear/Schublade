import { Router } from "express";
import indexCon from "./../controllers/index.js";
const index = Router();

index.get("/", indexCon.get);
index.get("/folder/:folderId", indexCon.get);
index.get("/file/:fileName", indexCon.getFile);
index.get("/delete/:folderId/:fileId/:fileName", indexCon.deleteFile);
export default index;
