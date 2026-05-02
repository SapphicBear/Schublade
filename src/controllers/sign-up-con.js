import Controller from "./controller.js";
import links from "./../data/links.js";
import titles from "./../data/titles.js";
import headers from "./../data/headers.js";

const content = {
    title: titles.signUp,
    header: headers.signUp,
    links: links
};

const signUpCon = new Controller("sign-up", "/sign-in", content);

export default signUpCon;