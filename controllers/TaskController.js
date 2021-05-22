const Task = require('../model/Task');
const ListEditing = require('../model/ListTaskEditing');
const Board = require('../model/Board');
const User = require('../model/User');
const crypto = require('crypto');

const createTask = async (req, res) => {
    const { title, idList, idBoard } = req.body;
    try {
        Promise.all([
            User.findById(req.user.id),
            ListEditing.findById(idList),
            Board.findById(idBoard)])
            .then(async (value) => {
                const user = value[0];
                const listEditingParent = value[1];
                const board = value[2];

                if (board) {
                    user.activity.push(`${user.username} create ${task.title}`);
                    await user.save();
                    const task = new Task({
                        title,
                        taskId: crypto.randomBytes(6).toString('hex'),
                        list_editing: listEditingParent._id,
                    })
                    await task.activity.push(`${user.username} created ${task.title}`);
                    const created = await task.save();
                    if (created) {
                        listEditingParent.list_task.push(created._id);
                        await listEditingParent.save();
                        return res.status(200).json(created);
                    }
                }

                return res.status(400).json({
                    code: 400,
                    message: "Create Task Fail."
                })
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const detailTask = async (req, res) => {
    const { idBoard } = req.body;
    try {
        Promise.all([Task.findById(req.params.taskId), Board.findById(idBoard)]).then((value) => {
            const task = value[0];
            const board = value[1];

            if (board && task) {
                return res.status(200).json(task);
            }
            return res.status(400).json({
                code: 400,
                message: "Task Not Found."
            })
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { idList } = req.body;
        Promise.all([
            Task.findById(req.params.taskId), 
            User.findById(req.user.id)]
        )
        .then(async (value) => {
            const task = value[0];
            const user = value[1];
            if (task) {
                user.activity.push(`${user.username} deleted ${task.title}`);
                await user.save();
                await ListEditing.updateOne(
                    { _id: idList },
                    {
                        $pull: { list_task: `${req.params.taskId}` }
                    }
                );
                const deleted = await task.remove();
                return res.status(200).json(deleted);
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const updateTask = async (req, res) => {
    let { title, due_time, idBoard, description, status, pos } = req.body;
    try {
        Promise.all([
            Task.findById(req.params.taskId), 
            User.findById(req.user.id), 
            Board.findById(idBoard)])
        .then(async (value) => {
            const task = value[0];
            const user = value[1];
            const board = value[2];
            if(board && task && user) {
                if(title) {
                    user.activity.push(`${user.username} updated ${task.title}`);
                }
                if(due_time) {
                    user.activity.push(`${user.username} set due time ${due_time}`)
                }
                task.title = title || task.title;
                task.due_time = due_time || task.due_time;
                task.description = description || task.description;
                task.status = status || task.status;
                const updated = await task.save();
                await user.save();
                return res.status(200).json(updated);
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}



module.exports = {
    createTask,
    deleteTask,
    detailTask,
    updateTask,
}