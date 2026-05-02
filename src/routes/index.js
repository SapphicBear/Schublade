import { Router } from "express";
import indexCon from "./../controllers/index.js";
const index = Router();

index.get("/", indexCon.get.bind(indexCon));

export default index;