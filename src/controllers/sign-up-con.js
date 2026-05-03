import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma.js";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";

const content = {
    title: titles.signUp,
    header: headers.signUp,
    links: links,
    user: "",
};

const signUpCon = {
    async get(req, res) {
        if (req.user) {
            res.redirect("/");
        }
        res.render("sign-up", content);
    },
    async postUser(req, res) {
        if (req.user) {
            res.statusCode(401).redirect("/");
        }
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await prisma.user.create({
                data: {
                    name: req.body.username,
                    email: req.body.email,
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
    },
};


export default signUpCon;