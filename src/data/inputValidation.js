import errors from "./../data/errors.js";

const inputValidation = {
    signInValidation = [
        body("name")
            .trim()
            .escape()
            .notEmpty()
            .withMessage(errors.name),
        body("password")
            .trim()
            .escape()
            .notEmpty()
            .withMessage(errors.password),
    ],
};

export default inputValidation;