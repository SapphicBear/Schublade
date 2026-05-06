import { Router } from "express";

const logoutRoute = Router();

logoutRoute.post("/", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/sign-in");
    });
});
export default logoutRoute;