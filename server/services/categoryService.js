const CategoryDAO = require('../dao/categoryDAO');

class CategoryService {
    static async list() {
        return await CategoryDAO.findAll();
    }

    static async create({ name, slug, image, description }) {
        return await CategoryDAO.create({ name, slug, image, description });
    }

    static async update(id, data) {
        return await CategoryDAO.update(id, data);
    }

    static async remove(id) {
        return await CategoryDAO.delete(id);
    }
}

module.exports = CategoryService;


