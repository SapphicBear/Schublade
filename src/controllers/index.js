import Controller from "./controller.js";

const indexCon = new Controller(
    "index", 
    "/", 
    { title: "Hi", header: "Hi" }
);

export { indexCon };