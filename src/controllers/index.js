import prisma from "../../lib/prisma.js";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";

const content = {
    title: titles.index,
    header: headers.index, 
    links: links,
};

const indexCon = {
    async get(req, res) {
        content.user = req.user;
        content.files = "";
        // Get files available
        res.render("index", content);
    },
};

export default indexCon;