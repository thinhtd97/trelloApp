const ListEditing = require('../model/ListTaskEditing');
const Board = require('../model/Board');

const createListEditing = async (req, res) => {
    const { title } = req.body;
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            return res.status(400).json({
                code: 400,
                message: "Invalid Board."
            })
        }

        const newListEditing = new ListEditing({
            title,
            idBoard: req.params.boardId
        })

        const created = await newListEditing.save();
        board.column.push(created._id);
        await board.save();

        if (!created) {
            return res.status(400).json({
                code: 400,
                message: "Create Board Fail."
            })
        }

        return res.status(200).json({
            code: 200,
            message: "Create List Task Success"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const deleteListEditing = async (req, res) => {
    try {
        const listEditing = await ListEditing.findById(req.params.id);
        if (listEditing) {
            await ListEditing.remove();
            return res.status(200).json({
                code: 200,
                message: "Remove Successful"
            })
        }
        return res.status(400).json({
            code: 400,
            message: "Remove Failed."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const updateListEditing = async (req, res) => {
    try {
        const { title } = req.body;
        const listEditingE = await ListEditing.findById(req.params.id);
        if (listEditingE) {
            listEditingE.title = title || listEditingE.title;
            const updated = await listEditingE.save();
            return res.status(200).json(updated);
        }
        return res.status(400).json({
            code: 400,
            message: "Update Failed."
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const copyListEditing = async (req, res) => {
    const { boardId } = req.body;
    try {
        Promise.all([ListEditing.findById(req.params.id), Board.findById(boardId)])
            .then(async (value) => {
                const listEditing = value[0];
                const board = value[1];
                if (listEditing) {
                    const newListEditing = new ListEditing({
                        title: listEditing.title,
                        idBoard: listEditing.idBoard,
                        list_task: listEditing.list_task
                    })
                    const created = await newListEditing.save();
                    board.column.push(created._id);
                    await board.save();
                    return res.status(200).json(created);
                } else if (!listEditing) {
                    return res.status(404).json({
                        code: 404,
                        message: "Invalid List"
                    })
                } else {
                    return res.status(400).json({
                        code: 400,
                        message: "Copy Fail."
                    })
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

const list = async (req, res) => {
    try {
        const listE = await ListEditing.find({ idBoard: req.params.boardId }).populate('list_task');
        if (!listE) {
            return res.status(404).json({
                code: 404,
                message: "Get List Fail."
            })
        }
        return res.status(200).json(listE);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const reOrderTaskInColumn = async (req, res) => {
    const { ListEditingId, ListEditingCardIds } = req.body;
    try {
        const ListEditingElement = await ListEditing.findById(ListEditingId);
        if (!ListEditingElement) {
            return res.status(404).json({
                code: 404,
                message: "Column Not Found"
            })
        }
        ListEditingElement.list_task = ListEditingCardIds;
        const updated = await ListEditingElement.save();

        return res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const reOderDifferentColumn = async (req, res) => {
    try {
        const {
            removedColumnId,
            addedColumnId,
            removedColumnCardIds,
            addedColumnCardIds,
        } = req.body;
        
       Promise.all([ListEditing.findById(removedColumnId), ListEditing.findById(addedColumnId)])
       .then(async (value) => {
            const removedListEditing = value[0];
            const addedListEditing = value[1];  

            if(!removedColumnCardIds || !addedColumnCardIds || !addedColumnId || !removedColumnId) {
                return res.status(400).json({
                    code: 400,
                    message: "Invalid Data."
                })                
            }

            removedListEditing.list_task = removedColumnCardIds;
            addedListEditing.list_task = addedColumnCardIds;
            Promise.all([removedListEditing.save(), addedListEditing.save()])
            .then(() => {
                return res.status(200).json({
                    code: 200,
                    message: "Reoder successful."
                })
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


module.exports = {
    createListEditing,
    deleteListEditing,
    updateListEditing,
    copyListEditing,
    list,
    reOrderTaskInColumn,
    reOderDifferentColumn
}