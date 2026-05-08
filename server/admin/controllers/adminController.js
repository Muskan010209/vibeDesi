const AdminService = require('../services/adminService');
const asyncHandler = require('../../utils/asyncHandler');

exports.getDashboardStats = asyncHandler(async (req, res, next) => {
    const data = await AdminService.getDashboardStats();
    res.status(200).json({ success: true, data });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await AdminService.getAllUsers();
    res.status(200).json({ success: true, count: users.length, data: users });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
    await AdminService.deleteUser(req.params.id);
    res.status(200).json({ success: true, data: {} });
});

exports.updateUserRole = asyncHandler(async (req, res, next) => {
    const { role } = req.body;
    const user = await AdminService.updateUserRole(req.params.id, role);
    res.status(200).json({ success: true, data: user });
});
