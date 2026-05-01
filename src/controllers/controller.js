class Controller {
    constructor(view, redirect = "/", content = {}) {
        this.view = view;
        this.redirect = redirect;
        this.content = content;
    }

    async get(req, res) {
        res.render(this.view, this.content);
    }
    async getAuth(req, res) {
        if (!req.user) {
            res.status(401).redirect(this.redirect);
        } else {
            res.status(400).render(this.view, this.content);
        }
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
export default Controller;