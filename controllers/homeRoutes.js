const router = require('express').Router();
const auth = require("../utils/auth")
const { Blog, User, Comment } = require('../models');


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

router.get("/blogs/:id", auth, async (req, res) => {
    try {
        const {id} = req.params;
        const blogData = await Blog.findOne({
            where: {
                id: id,
            },
            include: [
                {
                  model: User,
                  attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['content', 'user_id', 'date_created'],
                },
              ],
        })
        const blog = blogData.get({ plain: true });
        console.log(blog)
        res.render("comment", {blog, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router;
