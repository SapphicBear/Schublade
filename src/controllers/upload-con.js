import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";
import prisma from "../../lib/prisma.js";
import { supabase } from "./../../files/storageManager.js";

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
        const handleUpload = async () => {
            const { data, error } = await supabase.storage
                .from("Files")
                .upload(req.file.originalname, req.file);
            await prisma.file.create({
                data: {
                    name: req.file.originalname,
                    userId: req.user.id,
                    type: req.file.mimetype,
                    folderId: folderId,
                },
            });
        };
        const { fileURL } = supabase.storage
            .from("Files")
            .getPublicUrl(`${req.file.originalname}`);
        await prisma.file.update({
            where: {
                id: { req.params.file.id }
            },
            data: {
                url: { fileURL.publicUrl }
            }
        })
        res.redirect("/");
    },
};

export default uploadCon;
