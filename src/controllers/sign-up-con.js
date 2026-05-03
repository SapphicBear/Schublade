import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma.js";
import { validationResult, matchedData } from "express-validator";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";
import inputValidation from "../data/inputValidation.js";

const content = {
    title: titles.signUp,
    header: headers.signUp,
    links: links,
    input: "",
    errors: "",
    user: "",
};

const signUpCon = {
    async get(req, res) {
        if (req.user) {
            res.redirect("/");
        }
        res.render("sign-up", content);
    },
    signUp: [
        inputValidation.signUpValidation,

        async (req, res, next) => {
            if (req.user) {
                res.status(401).redirect("/");
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const input = {
                    username: req.body.username,
                    email: req.body.email,
                };
                content.input = input;
                content.errors = errors.array();
                res.status(400).render("sign-up", content);
            } else {
                const data = matchedData(req);
                try {
                    const hashedPassword = await bcrypt.hash(data.password, 10);
                    const user = await prisma.user.create({
                        data: {
                            name: data.username,
                            email: data.email,
                            password: hashedPassword,
                            files: {
                                create: [],
                            },
                        },
                    });
                    res.redirect("/sign-in");
                } catch (err) {
                    console.error(err);
                    next(err);
                }
            }
        },
    ],
};


export default signUpCon;