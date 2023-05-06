const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blog.bulkCreate(
    blogData.map((blog) => {
      return {
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      };
    })
  );

  await Comment.bulkCreate(
    commentData.map((comment) => {
      return {
        ...comment,
        blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
      };
    })
  );

  process.exit(0);
};

seedDatabase();
