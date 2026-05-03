import { Router } from "express";
import signUpCon from "./../controllers/sign-up-con.js";
const signUp = Router();

signUp.get("/", signUpCon.get);
signUp.post("/", signUpCon.signUp);

export default signUp;