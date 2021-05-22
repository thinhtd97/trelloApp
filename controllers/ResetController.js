const Board = require('../model/Board');
const ListEditing = require('../model/ListTaskEditing');
const Task = require('../model/Task');
const User = require('../model/User');

const resetDatabase = async (req, res) => {
    await Board.deleteMany();
    await ListEditing.deleteMany();
    await Task.deleteMany();
    await User.deleteMany();
    return res.status(200).send("Reseted");
}

module.exports = resetDatabase;