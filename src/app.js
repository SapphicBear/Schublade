import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import "dotenv/config";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import passport from "./passport.js";
import prisma from "./../lib/prisma.js";

import index from "./routes/index.js";
import signUp from "./routes/sign-up.js";
import signIn from "./routes/sign-in.js";
import logoutRoute from "./routes/logout.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: new PrismaSessionStore(
            prisma,
            {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);

app.use(passport.session());

app.use("/", index);
app.use("/sign-up", signUp);
app.use("/sign-in", signIn);
app.use("/logout", logoutRoute);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.statusCode || 500).send(error.message);
});

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server Live on ${PORT}`);
});