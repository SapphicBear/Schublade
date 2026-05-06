import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";

const content = {
    title: titles.upload,
    header: headers.upload,
    links: links,
};

const uploadCon = {
    async get(req, res) {
        content.user = req.user;
        res.render("upload", content);
    },
};

export default uploadCon;