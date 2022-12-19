const router = require('express').Router();
const { Blog } = require('../../models');
const Auth = require('../../utils/auth');

// create blog
router.post('/', Auth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update blog
router.put('/edit/:id', Auth, async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body;
        const blog = await Blog.findOne({
            where: {
                id: id,
            }
        });

        if (!blog) {
            res.status(404).end("cannot find that blog");
            return;
        }

        await blog.update({
            title, content,
        });
        res.status(200).json(blog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete blog
router.delete('/delete/:id', Auth, async (req, res) => {
    try {
        const { id } = req.params
        const blogData = await Blog.destroy({
            where: {
                id: id,
            }
        });

        if (!blogData) {
            res.status(404).json({ message: 'No Blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;
