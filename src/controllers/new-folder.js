import prisma from "../../lib/prisma.js";

const folderController = {
    async get(req, res) {
        
        console.log(req.body);
        console.log(req.params);
        if (!req.user) {
            return;
        }
        res.render("index", )
    },
    async post(req, res) {
        console.log(req.body);
        if (!req.user) {
            return;
        }
        await prisma.folder.create({
            data: {
                name: req.body["folder-name"],
                userId: req.user.id,
            }
        });
        res.redirect("/");
    }
}
export default folderController;
