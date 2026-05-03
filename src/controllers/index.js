import Controller from "./controller.js";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";

const content = {
    title: titles.index,
    header: headers.index, 
    links: links,
};

const indexCon = new Controller("index", "/", content);

export default indexCon;