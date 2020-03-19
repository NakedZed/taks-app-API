//In this file we defining the task schema and the construct the model of the task based on the schema.

const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({

    description: {

        type: String,
        required: true,
        trim: true

    },
    completed: {
        type: Boolean,
        default: false

    }

})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task