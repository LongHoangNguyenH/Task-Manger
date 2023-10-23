const express = require('express');
const tasks = require('./routes/taskroutes');
const dotenv = require('dotenv').config();
const ErrorHandler = require('./middlewares/ErrorHandler')
const Dbconnection = require('./config/DBconnection');

// Connect to Database
Dbconnection()

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('./views'));
app.use(express.json());
app.use('/api/tasks', require('./routes/taskroutes'));
app.use(ErrorHandler);


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})