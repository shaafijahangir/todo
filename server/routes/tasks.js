const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');  // Middleware to verify JWT
const Task = require('../models/Task');

// @route    GET api/tasks
// @desc     Get all tasks for the logged-in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });  // Fetch tasks for the user
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/tasks
// @desc     Create a task
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      user: req.user.id  // Associate task with the logged-in user
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/tasks/:id
// @desc     Delete a task
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// @route    PUT api/tasks/:id
// @desc     Update a task's title, description, and due date
// @access   Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update task fields
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/tasks/:id/complete
// @desc     Toggle task completion status
// @access   Private
router.put('/:id/complete', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure the task belongs to the logged-in user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Toggle the completed status
    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
