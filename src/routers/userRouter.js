const express = require('express')
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
//Adding a user. 

router.post('/register', async (req, res) => {
    // const user = new User(req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8)
        const user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }).save();
        res.send(user)

    } catch (e) {
        res.status(500).send();

    }
});

//Constructing login route.
router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({
            email: req.body.email
        });
        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) {
            return res.status(404).send();
        }
        res.send(user)
    } catch (e) {

        res.status(500).send(e);
    }

})

module.exports = router;