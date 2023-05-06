const router = require('express').Router();
const { User } = require('../models/User');

router.get('/', (req, res) => {
    res.send('<h1>Hi this call was successful</h1>');
});

module.exports = router;