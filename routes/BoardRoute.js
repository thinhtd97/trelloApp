const express = require('express');
const router = express.Router();
const BoardController = require('../controllers/BoardController');
const middleware = require('../middlewares/middlewares')

router.get('/closed-board', middleware.protect, BoardController.listBoardClosed);
router.route('/').get(middleware.protect, BoardController.listBoard)
                .post(middleware.protect, BoardController.createBoard);
router.get('/without-star', middleware.protect, BoardController.listBoardWithOutStar);
router.get('/star', middleware.protect, BoardController.listBoardStar);
router.route('/:id')
    .put(middleware.protect, BoardController.updateBoard)
    .delete(middleware.protect, BoardController.deleteBoard)
router.put('/update-star/:id', middleware.protect, BoardController.updateStar);
router.post('/invite', middleware.protect, BoardController.inviteMember);
router.post('/reoder-column', middleware.protect, BoardController.reOrderListEditingInBoard);

module.exports = router;