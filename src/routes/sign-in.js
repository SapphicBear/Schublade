import { Router } from "express";
import signInCon from "./../controllers/sign-in-con.js";
const signIn = Router();

signIn.get("/", signInCon.get);
signIn.post("/", signInCon.signIn);

export default signIn;