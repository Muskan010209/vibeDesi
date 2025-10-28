const UserDAO = require('../dao/userDAO');
const generateToken = require('../utils/generateToken');

class AuthService {
    static async register(userData) {
        const { name, email, password, role } = userData;

        // Check if user exists
        const existingUser = await UserDAO.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        // Create user
        const user = await UserDAO.create({
            name,
            email,
            password,
            role: role || 'user'
        });

        const token = generateToken(user._id);

        return {
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    static async login(email, password) {
        // Check if user exists with password
        const user = await UserDAO.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Update last login
        await UserDAO.update(user._id, { lastLogin: new Date() });

        const token = generateToken(user._id);

        return {
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    static async getMe(userId) {
        return await UserDAO.findById(userId);
    }
}

module.exports = AuthService;

