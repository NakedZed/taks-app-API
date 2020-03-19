const express = require('express')
const router = express.Router();
const Task = require('../models/task');

// Adding a task.
router.post('/addTask', async (req, res) => {

    try {

        const task = await new Task(req.body).save();
        res.send(task)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router;