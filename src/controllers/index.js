export const indexCon = {
    async get(req, res) {
        res.render("index");
    },
};

class Controller {
    constructor(view, redirect = "/") {
        this.view = view;
        this.redirect = redirect;
    }

    async get(req, res) {
        res.render(this.view);
    }
    async post(req, res) {
        res.redirect(this.redirect);
    }
    async update(req, res) {
        res.redirect(this.redirect);
    }
    async delete(req, res) {
        res.redirect(this.redirect);
    }
}