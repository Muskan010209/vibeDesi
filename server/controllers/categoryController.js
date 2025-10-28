const CategoryService = require('../services/categoryService');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
    const categories = await CategoryService.list();
    res.status(200).json({ success: true, count: categories.length, data: categories });
});

exports.create = asyncHandler(async (req, res) => {
    const category = await CategoryService.create(req.body);
    res.status(201).json({ success: true, data: category });
});

exports.update = asyncHandler(async (req, res) => {
    const category = await CategoryService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: category });
});

exports.remove = asyncHandler(async (req, res) => {
    await CategoryService.remove(req.params.id);
    res.status(200).json({ success: true, data: {} });
});


