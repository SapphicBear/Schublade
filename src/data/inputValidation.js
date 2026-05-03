import { body } from "express-validator";
import errors from "./../data/errors.js";

const inputValidation = {
    signInValidation: [
        body("name")
            .trim()
            .escape()
            .notEmpty()
            .withMessage(errors.length.name),
        body("password")
            .trim()
            .escape()
            .notEmpty()
            .withMessage(errors.length.password),
    ],
    signUpValidation: [
        body("username")
            .trim()
            .escape()
            .notEmpty()
            .withMessage(errors.length.name),
        body("email")
            .trim()
            .isEmail()
            .withMessage(errors.type.email)
            .notEmpty()
            .withMessage(errors.length.email),
        body("password")
            .trim()
            .escape()
            .notEmpty()
            .withMessage(errors.length.password),
    ],
};

export default inputValidation;