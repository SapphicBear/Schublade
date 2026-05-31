import { Router } from "express";
import folderController from "./../controllers/new-folder.js";

const folderRouter = Router();

folderRouter.post("/", folderController.post);

export default folderRouter;
