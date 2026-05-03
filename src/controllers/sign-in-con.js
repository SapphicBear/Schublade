import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma.js";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";

const content = {
    title: titles.signIn,
    header: headers.signIn, 
    links: links,
};

const signInCon = {
    async get(req, res) {
        if (req.user) {
            res.statusCode(401).redirect("/");
        }
        res.render("sign-in", content);
    },
    async post(req, res) {
        console.log("NO"); // zzz
    },
};

export default signInCon;