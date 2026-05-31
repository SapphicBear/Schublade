import { Router } from "express";
import indexCon from "./../controllers/index.js";
const index = Router();

index.get("/", indexCon.get);
index.get("/:id", indexCon.get);
export default index;
