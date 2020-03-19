const express = require('express');
const app = express();
const port = process.env.PORT || 3000; //Configuring the Port

app.use(express.json()); //Parsing incoming json to an object so we can access it in the request handler
require('./db/mongoose'); //To connect to the database.

//Requiring the USER and TASK models.
const User = require('./models/user');
const Task = require('./models/task');

//include USER and TASK routers in the app.js to use them as a middleware
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');


app.use(userRouter);
app.use(taskRouter);

// Configuring the server by listening to specific defined port "3000" or env port which we we deploy the app.
app.listen(port, () => {
    console.log(`We are listening to ${port}`);
});