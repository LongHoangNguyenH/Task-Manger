const Task = require('../models/taskModel')
const asyncHandler = require('express-async-handler')

// @desc Get all tasks
// @route GET /api/tasks
// @access public
const getAllTasks = asyncHandler( async (req, res) => {
    const tasks = await Task.find({task_id:req.params.id});
    res.status(200).json(tasks);
});

// @desc create task
// @route POST /api/tasks/:id
// @access public
const createTask = asyncHandler(async(req, res) => {
    console.log('The request body is: ',req.body);
    const {name, completed} = req.body;
    if(!name ){
        res.status(400)
        throw new Error('All fields are mandatory');
    }
    const task = await Task.create({
        name,
        completed
    })
    res.status(200).json(task);

});

// @desc Get task
// @route GET /api/tasks/:id
// @access public
const getTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404);
        throw new Error('No task you are finding');
    }
    res.status(200).json(task);
});

// @desc Update task
// @route PUT /api/tasks/:id
// @access public
const updateTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404);
        throw new Error('Not Found');
    }
    if(task.id.toString()!==req.params.id){
        res.status(403);
        throw new Error('No permission to update task');
    }
    const updated_task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json({message:`Updated contact for ${updated_task}`})
});

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access public
const deleteTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404);
        throw new Error('Not Found');
    }
    if(task.id.toString()!==req.params.id){
        res.status(403);
        throw new Error('No permission to update task');
    }
    
    await task.deleteOne({_id: req.params.id});
    res.status(200).json(task);
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}
