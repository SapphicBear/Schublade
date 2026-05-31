import prisma from "../../lib/prisma.js";

const folderController = {
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
