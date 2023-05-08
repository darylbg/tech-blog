const router = require('express').Router();
const { Blog } = require('../../models/Blog');
const { Comment } = require('../../models/Comment');
const { User } = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const dbBlogs = await Blog.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['body']
                },
                {
                    model: User,
                    attributes: ['first_name', 'last_name']
                }
            ]
        });
        if(!dbBlogs) {
            res.status(400).send('no blog posts yet')
        }
        const blogs = dbBlogs.map((blog) => 
            blog.get({ plain: true })
        );
        res.render('blogs', {
            blogs
        });
    } catch (error) {
        res.status(500).json(error); 
    }
});

module.exports = router;