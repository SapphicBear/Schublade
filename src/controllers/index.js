import prisma from "../../lib/prisma.js";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";
import { supabase } from "./../../files/storageManager.js";

const content = {
    title: titles.index,
    header: headers.index,
    links: links,
    files: "",
    folders: "",
};

const indexCon = {
    async get(req, res) {
        if (!req.user) {
            res.redirect("/sign-in");
        } else {
            content.folders = await prisma.folder.findMany({
                where: { userId: req.user.id },
            });
            const query = await prisma.user.findFirst({
                include: {
                    files: true,
                    folders: true,
                },
                where: {
                    id: req.user.id,
                },
            });
            content.currentFolder = "";
            content.folders = query.folders;
            content.files = query.files;
            content.user = query;

            if (req.params.folderId) {
                let folderId = parseInt(req.params.folderId);
                content.currentFolder = await prisma.folder.findFirst({
                    where: {
                        id: folderId,
                    },
                });
                content.files = query.files.filter(
                    (file) => file.folderId == folderId
                );
            }
            // Get files available
            res.render("index", content);
        }
    },
    async getFile(req, res) {
        res.render("index", content);
    },
    async deleteFile(req, res) {
        await prisma.file.deleteMany({
            where: {
                userId: req.user.id,
                id: parseInt(req.params.fileId),
            },
        });
        const { data, error } = await supabase.storage
            .from("Files")
            .remove([req.params.fileName]);
        res.redirect("/");
    },
};

export default indexCon;
