import prisma from "../../lib/prisma.js";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";

const content = {
    title: titles.index,
    header: headers.index, 
    links: links,
    user: "",
};

const indexCon = {
    async get(req, res) {
        if (req.user) {
            content.user = req.user;
        }
        // Get files available
        res.render("index", content);
    },
};

export default indexCon;