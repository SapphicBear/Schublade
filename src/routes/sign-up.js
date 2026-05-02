import { Router } from "express";
import signUpCon from "./../controllers/sign-up-con.js";
const signUp = Router();

signUp.get("/", signUpCon.get.bind(signUpCon));

export default signUp;