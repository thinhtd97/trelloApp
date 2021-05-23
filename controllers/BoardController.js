const Board = require('../model/Board');
const User = require('../model/User');
const ListEditing = require('../model/ListTaskEditing');

const listBoardClosed = async (req, res) => {
    try {
        const boards = await Board.find({ closed: true, member: req.user.id });
        if(!boards) {
            return res.status(400).json({
                code: 400,
                message: "Board Error!"
            })
        }
        return res.status(200).json(boards);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const listBoard = async (req, res) => {
    try {
        const boards = await Board.find({ member: req.user.id, closed: false })
        if(!boards) {
            return res.status(400).json({
                code: 400,
                message: "Board Error!"
            })
        }
        return res.status(200).json(boards);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const updateBoard = async (req, res) => {
    const { title, closed } = req.body;
    try {
        Promise.all([Board.findById(req.params.id), User.findById(req.user.id)])
        .then(async (value) => {
            const board = value[0];
            const user = value[1];

            if(board) {
                board.title = title || board.title;
                board.closed = closed || board.closed;
                const updated = await board.save();
              
                user.activity.push(`${user.username} updated ${board.title} to ${updated.title}`);
                await user.save();
                return res.status(200).json({
                    code: 200,
                    message: "UPDATE STAR SUCCESSFUL"
                });
            }
    
            return res.status(400).json({
                code: 400,
                message: "Upated product fail."
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

const createBoard = async (req, res) => {
    const { title } = req.body; 
    const user = await User.findById(req.user.id);
    try {
        const newBoard = new Board({
            title,
            member: [req.user.id],
            user: req.user.id,
            star: false
        })

        const created = await newBoard.save()
        user.activity.push(`${user.username} created ${created.title}`)
        await user.save();
        if(!created) {
            return res.status(400).json({
                code: 400,
                message: "Create Board Fail."
            })
        }

        return res.status(200).json(created);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const updateStar = async (req, res) => {
    try {
        Promise.all([Board.findById(req.params.id), User.findById(req.user.id)])
        .then(async (value) => {
            const board = value[0];
            const user = value[1];
            if(!user) {
                return res.status(404).json({
                    code: 404,
                    message: "Invalid User"
                })
            }
            if(board) {
                board.star = !board.star;
                const updated = await board.save();
                user.activity.push(`${user.username} updated star ${updated.title}`)
                await user.save();
                return res.status(200).json(updated)
            }
            return res.status(400).json({
                code: 400,
                message: "Update Fail."
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

const listBoardWithOutStar = async (req, res) => {
    try {
        const boards = await Board.find({ star: false, user: req.user.id })
        if(!boards) {
            return res.status(400).json({
                code: 400,
                message: "Board Error!"
            })
        }
        return res.status(200).json(boards);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const listBoardStar = async (req, res) => {
    try {
        const boards = await Board.find({ star: true, user: req.user.id })
        if(!boards) {
            return res.status(400).json({
                code: 400,
                message: "Board Error!"
            })
        }
        return res.status(200).json(boards);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

const deleteBoard = async (req, res) => {
    try {
        Promise.all([Board.findById(req.params.id), User.findById(req.user.id)])
        .then(async (value) => {
            const board = value[0];
            const user = value[1];
            if(board) {
                const deleted = await board.remove();
                user.activity.push(`${user.username} deleted ${deleted.title}`);
                await ListEditing.deleteMany({ board: req.params.id });
                await user.save();
                return res.status(200).json({
                    code: 200,
                    message: "DELETE SUCCESSFUL"
                });
            }
            return res.status(400).json({
                code: 400,
                message: "Delete Failed"
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

const inviteMember = async (req, res) => {
    try {
        const { username, idBoard } = req.body;

        Promise.all([User.findOne({ username }), Board.findById(idBoard), User.findById(req.user.id)])
        .then(async (value) => {
            
            const user = value[0];
            const board = value[1];
            const currentUser = value[2];
            const flag = board.member.includes(user._id);

            if(user && board && !flag) {
                board.member.push(user._id);
                await board.save();
                currentUser.activity.push(`${currentUser.username} invited ${user.username}`);
                await currentUser.save();
                return res.status(200).json({
                    code: 200,
                    message: "Invited Member."
                });
            } else {
                return res.status(400).json({
                    code: 400,
                    message: "Invalid Data."
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

const reOrderListEditingInBoard = async (req, res) => {
    try {
        const { boardId, newColumnOrder } = req.body;
        if(boardId && newColumnOrder) {
            const board = await Board.findById(boardId);
            board.column = newColumnOrder;
            await board.save();
            return res.status(200).json({
                code: 200,
                message: "Reorder successful."
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}

module.exports = {
    listBoard,
    createBoard,
    updateBoard,
    updateStar,
    listBoardWithOutStar,
    deleteBoard,
    listBoardClosed,
    inviteMember,
    reOrderListEditingInBoard,
    listBoardStar
}