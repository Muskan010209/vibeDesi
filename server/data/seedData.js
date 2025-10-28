const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const products = [
    {
        name: "Rajasthani Printed Kurti with Choli",
        description: "Beautiful traditional Rajasthani kurti with intricate patterns and vibrant colors",
        price: 1299,
        discount: 20,
        category: "kurti",
        size: ["S", "M", "L", "XL"],
        colors: ["Red", "Blue", "Pink", "Yellow"],
        images: ["https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500", "https://images.unsplash.com/photo-1596755389378-c31cbec6be2f?w=500"],
        inStock: true,
        rating: 4.5,
        reviewCount: 128,
        tags: ["traditional", "printed", "comfortable"],
        material: "Cotton Blend",
        careInstructions: "Hand wash or gentle machine wash"
    },
    {
        name: "Designer Dupatta Set",
        description: "Elegant dupatta set perfect for special occasions with matching accessories",
        price: 2499,
        discount: 15,
        category: "dupatta-set",
        size: ["One Size"],
        colors: ["Red", "Green", "Gold"],
        images: ["https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500", "https://images.unsplash.com/photo-1618354691373-d851c3c3a0f2?w=500"],
        inStock: true,
        rating: 4.7,
        reviewCount: 89,
        tags: ["designer", "ethnic", "elegant"],
        material: "Silk Blend",
        careInstructions: "Dry clean only"
    },
    {
        name: "Embroidered Salwar Suit",
        description: "Comfortable salwar suit with beautiful embroidery work",
        price: 3499,
        discount: 25,
        category: "salwar-suit",
        size: ["S", "M", "L", "XL", "XXL"],
        colors: ["Navy Blue", "Maroon", "Teal"],
        images: ["https://images.unsplash.com/photo-1594633313239-bab3825d0caf?w=500", "https://images.unsplash.com/photo-1506629905617-5f8e7e2a9a6c?w=500"],
        inStock: true,
        rating: 4.6,
        reviewCount: 156,
        tags: ["embroidered", "traditional", "comfortable"],
        material: "Cotton",
        careInstructions: "Machine wash, cold water"
    },
    {
        name: "Festive Combo Set",
        description: "Complete festive ensemble with kurti, dupatta and accessories",
        price: 4999,
        discount: 30,
        category: "combo-set",
        size: ["M", "L", "XL"],
        colors: ["Red", "Orange", "Pink", "Green"],
        images: ["https://images.unsplash.com/photo-1602810319071-f81e9f8e4a2a?w=500", "https://images.unsplash.com/photo-1617196034796-73dfa1e5f1e6?w=500"],
        inStock: true,
        rating: 4.8,
        reviewCount: 203,
        tags: ["festive", "combo", "complete-set"],
        material: "Cotton Silk",
        careInstructions: "Dry clean recommended"
    },
    {
        name: "Casual Cotton Kurti",
        description: "Comfortable everyday wear kurti in soft cotton fabric",
        price: 899,
        discount: 10,
        category: "kurti",
        size: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Beige", "Light Blue", "Lavender"],
        images: ["https://images.unsplash.com/photo-1596755389378-c31cbec6be2f?w=500", "https://images.unsplash.com/photo-1625456791758-6a56f5d3c6f9?w=500"],
        inStock: true,
        rating: 4.3,
        reviewCount: 245,
        tags: ["casual", "cotton", "comfortable"],
        material: "Pure Cotton",
        careInstructions: "Machine wash, tumble dry"
    },
    {
        name: "Designer Lehenga Dupatta",
        description: "Luxurious lehenga style dupatta with intricate work",
        price: 3899,
        discount: 20,
        category: "dupatta-set",
        size: ["One Size"],
        colors: ["Red", "Green", "Purple"],
        images: ["https://images.unsplash.com/photo-1618354691373-d851c3c3a0f2?w=500", "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500"],
        inStock: true,
        rating: 4.9,
        reviewCount: 67,
        tags: ["luxury", "designer", "lehenga"],
        material: "Georgette",
        careInstructions: "Dry clean only"
    },
    {
        name: "Floral Embroidered Kurti",
        description: "Beautiful kurti with floral embroidery and mirror work",
        price: 1599,
        discount: 18,
        category: "kurti",
        size: ["S", "M", "L", "XL", "XXL"],
        colors: ["Navy Blue", "Maroon", "Teal"],
        images: ["https://images.unsplash.com/photo-1596755389378-c31cbec6be2f?w=500", "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500"],
        inStock: true,
        rating: 4.4,
        reviewCount: 92,
        tags: ["floral", "embroidered", "traditional"],
        material: "Cotton",
        careInstructions: "Hand wash recommended"
    },
    {
        name: "Georgette Dupatta Set",
        description: "Elegant georgette dupatta set with digital prints",
        price: 1799,
        discount: 12,
        category: "dupatta-set",
        size: ["One Size"],
        colors: ["Pink", "Purple", "Blue", "Green"],
        images: ["https://images.unsplash.com/photo-1618354691373-d851c3c3a0f2?w=500", "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500"],
        inStock: true,
        rating: 4.6,
        reviewCount: 134,
        tags: ["georgette", "digital-print", "elegant"],
        material: "Georgette",
        careInstructions: "Dry clean only"
    },
    {
        name: "Printed Cotton Salwar Suit",
        description: "Comfortable printed salwar suit for everyday wear",
        price: 2299,
        discount: 22,
        category: "salwar-suit",
        size: ["S", "M", "L", "XL"],
        colors: ["Beige", "Pastel Blue", "Peach"],
        images: ["https://images.unsplash.com/photo-1506629905617-5f8e7e2a9a6c?w=500", "https://images.unsplash.com/photo-1594633313239-bab3825d0caf?w=500"],
        inStock: true,
        rating: 4.5,
        reviewCount: 187,
        tags: ["printed", "cotton", "casual"],
        material: "Cotton",
        careInstructions: "Machine wash"
    },
    {
        name: "Designer Anarkali Set",
        description: "Stylish Anarkali kurti with embellishments and flowy design",
        price: 3199,
        discount: 20,
        category: "kurti",
        size: ["M", "L", "XL", "XXL"],
        colors: ["Red", "Green", "Blue", "Pink"],
        images: ["https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500", "https://images.unsplash.com/photo-1625456791758-6a56f5d3c6f9?w=500"],
        inStock: true,
        rating: 4.7,
        reviewCount: 156,
        tags: ["anarkali", "designer", "flowy"],
        material: "Rayon",
        careInstructions: "Dry clean recommended"
    },
    {
        name: "Luxury Wedding Dupatta Set",
        description: "Premium wedding dupatta set with heavy embroidery",
        price: 5999,
        discount: 25,
        category: "dupatta-set",
        size: ["One Size"],
        colors: ["Red", "Gold", "Maroon", "Navy"],
        images: ["https://images.unsplash.com/photo-1618354691373-d851c3c3a0f2?w=500", "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500"],
        inStock: true,
        rating: 4.9,
        reviewCount: 89,
        tags: ["luxury", "wedding", "heavy-embroidery"],
        material: "Silk",
        careInstructions: "Dry clean only"
    },
    {
        name: "Party Wear Salwar Suit",
        description: "Glittery party wear salwar suit for special occasions",
        price: 4199,
        discount: 28,
        category: "salwar-suit",
        size: ["S", "M", "L", "XL", "XXL"],
        colors: ["Gold", "Silver", "Rose Gold"],
        images: ["https://images.unsplash.com/photo-1594633313239-bab3825d0caf?w=500", "https://images.unsplash.com/photo-1506629905617-5f8e7e2a9a6c?w=500"],
        inStock: true,
        rating: 4.6,
        reviewCount: 203,
        tags: ["party-wear", "glittery", "festive"],
        material: "Georgette",
        careInstructions: "Dry clean only"
    },
    {
        name: "Traditional Bandhej Kurti",
        description: "Rajasthani traditional bandhej print kurti with vibrant colors",
        price: 1399,
        discount: 15,
        category: "kurti",
        size: ["S", "M", "L", "XL"],
        colors: ["Yellow", "Orange", "Pink"],
        images: ["https://images.unsplash.com/photo-1596755389378-c31cbec6be2f?w=500", "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500"],
        inStock: true,
        rating: 4.5,
        reviewCount: 167,
        tags: ["bandhej", "traditional", "rajasthani"],
        material: "Cotton",
        careInstructions: "Hand wash"
    },
    {
        name: "Complete Festive Combo",
        description: "Complete festive set with kurti, dupatta, and matching jewelry",
        price: 7499,
        discount: 35,
        category: "combo-set",
        size: ["M", "L", "XL"],
        colors: ["Red", "Maroon", "Navy"],
        images: ["https://images.unsplash.com/photo-1602810319071-f81e9f8e4a2a?w=500", "https://images.unsplash.com/photo-1617196034796-73dfa1e5f1e6?w=500"],
        inStock: true,
        rating: 4.8,
        reviewCount: 245,
        tags: ["festive", "combo", "complete"],
        material: "Silk",
        careInstructions: "Dry clean"
    },
    {
        name: "Casual Palazzo Suit",
        description: "Trendy palazzo suit with contemporary design",
        price: 1899,
        discount: 10,
        category: "salwar-suit",
        size: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Gray"],
        images: ["https://images.unsplash.com/photo-1506629905617-5f8e7e2a9a6c?w=500", "https://images.unsplash.com/photo-1594633313239-bab3825d0caf?w=500"],
        inStock: true,
        rating: 4.4,
        reviewCount: 198,
        tags: ["casual", "palazzo", "contemporary"],
        material: "Cotton",
        careInstructions: "Machine wash"
    }
];

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kamuskan01_db_user:mr94OLLkobjp0oEB@vibe.pij4q2a.mongodb.net/vibeDesi?retryWrites=true&w=majority';

const seedProducts = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB Atlas');
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Products seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedProducts();
}

module.exports = seedProducts;

