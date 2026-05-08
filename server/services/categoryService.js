const CategoryDAO = require('../dao/categoryDAO');

const generateSlug = (value) => {
    return value
        .toString()
        .toLowerCase()
        .trim()

        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};

class CategoryService {
    static async list() {
        return await CategoryDAO.findAll();
    }

    static async create({ name, slug, image, description }) {
        const finalSlug = slug ? generateSlug(slug) : generateSlug(name);
        return await CategoryDAO.create({ name, slug: finalSlug, image, description });
    }

    static async update(id, data) {
        if (data.slug) {
            data.slug = generateSlug(data.slug);
        } else if (data.name) {
            data.slug = generateSlug(data.name);
        }
        return await CategoryDAO.update(id, data);
    }

    static async remove(id) {
        return await CategoryDAO.delete(id);
    }
}

module.exports = CategoryService;


