import { Router } from "express";
import indexCon from "./../controllers/index.js";
const index = Router();

index.get("/", indexCon.get);

export default index;