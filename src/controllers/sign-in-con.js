import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma.js";
import passport from "./../passport.js";
import { matchedData, validationResult, body } from "express-validator";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";
import inputValidation from "../data/inputValidation.js";


const content = {
    title: titles.signIn,
    header: headers.signIn, 
    links: links,
};

const signInCon = {
    async get(req, res) {
        if (req.user) {
            res.status(401).redirect("/");
        }
        res.render("sign-in", content);
    },
    signIn: [
        inputValidation.signInValidation,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("failure")
                content.errors = errors.array();
                res.status(400).render("sign-in", content);
            } else {
                console.log("Hi")
                req.body = matchedData(req);
                passport.authenticate("local", {
                    successRedirect: "/",
                    failureRedirect: "/sign-in",
                    failureMessage: true,
                })(req, res, next);
            }
        },
    ],
};

export default signInCon;