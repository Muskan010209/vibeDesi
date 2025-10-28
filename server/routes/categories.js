const express = require('express');
const { list, create, update, remove } = require('../controllers/categoryController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(list)
    .post(protect, restrictTo('admin'), create);

router.route('/:id')
    .put(protect, restrictTo('admin'), update)
    .delete(protect, restrictTo('admin'), remove);

module.exports = router;


