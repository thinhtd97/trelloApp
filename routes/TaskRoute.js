const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');
const middleware = require('../middlewares/middlewares')

router.route('/')
    .post(middleware.protect, taskController.createTask)
    .get(middleware.protect, taskController.listTask);
router.route('/:taskId')
                    .delete(middleware.protect, taskController.deleteTask)
                    .get(middleware.protect, taskController.detailTask)
                    .put(middleware.protect, taskController.updateTask)

module.exports = router;