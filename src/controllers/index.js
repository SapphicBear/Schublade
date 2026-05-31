import prisma from "../../lib/prisma.js";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";

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
            content.user = req.user;
            content.folders = await prisma.folder.findMany(
                { where: { userId: req.user.id }});
            
            if (req.params.folderId) {
                let folderId = parseInt(req.params.folderId);
                
                content.files = await prisma.file.findMany({
                    where: { userId: req.user.id, folderId: folderId }
                });
            } else {
                content.files = await prisma.file.findMany({
                    where: { userId: req.user.id },
                });
            } 
            // Get files available
            res.render("index", content);
        }
    },
};

export default indexCon;
