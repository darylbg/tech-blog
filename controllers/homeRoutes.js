const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get("/", async (req, res) => {
    try {
      const dbBlogs = await Blog.findAll({
         include: [
                  {
                      model: Comment,
                      attributes: ['body'] 
                  },
                  {
                      model: User,
                      attributes: ['name']
                  }
                 ]
      });
  
      const blogs = dbBlogs.map((blog) => blog.get({ plain: true }));
      res.render("blogs", { blogs });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

module.exports = router;