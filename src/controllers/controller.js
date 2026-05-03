import prisma from "./../../lib/prisma.js";
import bcrypt from "bcryptjs";

class Controller {
    constructor(view, redirect = "/", content = {}) {
        this.view = view;
        this.redirect = redirect;
        this.content = content;
        
    }

    async get(req, res) {
        res.render(this.view, this.content);
    }
    async getAuth(req, res) {
        if (!req.user) {
            res.status(401).redirect(this.redirect);
        } else {
            res.status(400).render(this.view, this.content);
        }
    }
    async postUser(req, res, next) {
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
            res.redirect(this.redirect);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async update(req, res) {
        res.redirect(this.redirect);
    }
    async delete(req, res) {
        res.redirect(this.redirect);
    }
}
export default Controller;