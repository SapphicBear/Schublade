const folderController = {
    post(req, res) {
        console.log(req.body);
        if (!req.user) {
            return;
        }

        res.redirect("/");
    }
}
export default folderController;
