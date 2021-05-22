const express = require('express');
const router = express.Router();
const ListEditingController = require('../controllers/ListEditingController');
const middleware = require('../middlewares/middlewares')

// http://localhost:3001/api/list-editing
router.route('/:boardId')
    .post(middleware.protect, ListEditingController.createListEditing)
    .get(middleware.protect, ListEditingController.list);
router.route('/:id')
    .post(middleware.protect, ListEditingController.deleteListEditing)
    .put(middleware.protect, ListEditingController.updateListEditing)
router.post('/copy/:id', middleware.protect, ListEditingController.copyListEditing);
router.post('/reorder/samecolumn', middleware.protect, ListEditingController.reOrderTaskInColumn)
router.post('/reoder/differentcolumn', middleware.protect, ListEditingController.reOderDifferentColumn);

module.exports = router;