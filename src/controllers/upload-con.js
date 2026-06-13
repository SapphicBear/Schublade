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
        const handleUpload = async (file) => {
            const { data, error } = await supabase.storage
                .from("Files")
                .upload(file.originalname, file);
            if (error) {
                console.error(error);
                return;
            }
            const { fileURL } = supabase.storage
                .from("Files")
<<<<<<< HEAD
                .getPublicURL(file.originalname);
=======
                .getPublicUrl(file.originalname);
>>>>>>> 26939b4 (get public url for files)
            return fileURL.publicUrl;
        };
        const fileURL = await handleUpload(req.file);
        await prisma.file.create({
            data: {
                name: req.file.originalname,
                userId: req.user.id,
                type: req.file.mimetype,
                url: fileURL,
                folderId: folderId,
            },
        });
        res.redirect("/");
    },
};

export default uploadCon;
