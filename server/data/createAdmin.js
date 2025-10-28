const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kamuskan01_db_user:mr94OLLkobjp0oEB@vibe.pij4q2a.mongodb.net/vibeDesi?retryWrites=true&w=majority';

const createAdmin = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin exists
        const existingAdmin = await User.findOne({ email: 'admin@vibedesi.com' });

        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@vibedesi.com',
            password: 'admin123',
            role: 'admin'
        });

        console.log('✓ Admin user created successfully!');
        console.log('Email: admin@vibedesi.com');
        console.log('Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    createAdmin();
}

module.exports = createAdmin;

