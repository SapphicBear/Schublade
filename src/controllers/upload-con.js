import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";

const content = {
    title: titles.upload,
    header: headers.upload,
    links: links,
    input: "",
    errors: "",
    user: "",
};

const uploadCon = {
    async get(req, res) {
        res.render("upload", content);
    },
};

export default uploadCon;