const router = require('express').Router();
const auth = require("../utils/auth")
const { Blog, User, comment } = require('../models');


router.get("/", async (req, res) => {
    try {
        // Get all blog
        const blogData = await Blog.findAll({
            include: [
                {
                  model: User,
                  attributes: ['name'],
                },
              ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render("homepage", {blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/signUp", (req, res) => {
    res.render("signUp");
})

module.exports = router;
