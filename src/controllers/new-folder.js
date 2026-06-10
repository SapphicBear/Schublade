import prisma from "../../lib/prisma.js";
import inputValidation from "../data/inputValidation.js";
import { validationResult, matchedData } from "express-validator";

const folderController = {
    post: [
        inputValidation.folderNameValidation,

        async (req, res, next) => {
            if (!req.user) {
                return;
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).redirect("/");
            } else {
                const data = matchedData(req);
                try {
                    await prisma.folder.create({
                        data: {
                            name: data["folder-name"],
                            userId: req.user.id,
                        },
                    });
                } catch (err) {
                    console.error(err);
                    next(err);
                }
            }
            res.redirect("/");
        },
    ],
};
export default folderController;
