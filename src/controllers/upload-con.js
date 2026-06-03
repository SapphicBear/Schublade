import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";
import prisma from "../../lib/prisma.js";

const content = {
    title: titles.upload,
    header: headers.upload,
    links: links,
    folders: "",
};

const uploadCon = {
    async get(req, res) {
        content.user = req.user;
        content.folders = await prisma.folder.findMany({
            where: {
                userId: req.user.id,
            },
        });
        res.render("upload", content);
    },
    async post(req, res) {
        if (!req.user) {
            return;
        }
        const folderId = parseInt(req.body.folders);
        // upload file url to database
        await prisma.file.create({
            data: {
                name: req.file.originalname,
                userId: req.user.id,
                type: req.file.mimetype,
                url: req.file.path,
                folderId: folderId,
            },
        });
        res.redirect("/");
    },
};

export default uploadCon;
