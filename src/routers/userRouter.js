const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = await new User(req.body).save();

        res.send(user);
    } catch (e) {
        res.status(500).send('cant store this user');
    }
});

//Constructing login route.
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            throw new Error('there is no user with this email');
        }

        const isMatch = bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            throw new Error('Wrong password!');
        }

        const token = await user.generateAuthToken();

        res.send({
            user,
            token
        });
    } catch (e) {
        res.status(404).send('Ooops');
    }
});

module.exports = router;