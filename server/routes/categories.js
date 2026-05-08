const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { list, create, update, remove } = require('../controllers/categoryController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads', 'categories');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const cleanedName = file.originalname.replace(/\s+/g, '-');
        cb(null, `${timestamp}-${cleanedName}`);
    }
});

const upload = multer({ storage });

router.route('/')
    .get(list)
    .post(protect, restrictTo('admin'), upload.single('imageFile'), create);

router.route('/:id')
    .put(protect, restrictTo('admin'), upload.single('imageFile'), update)
    .delete(protect, restrictTo('admin'), remove);

module.exports = router;


