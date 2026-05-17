const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const connectDB = require('../server/config/database')
const errorHandler = require('../server/middleware/errorHandler')

const authRoutes = require('../server/routes/auth')
const productsRoutes = require('../server/routes/products')
const categoriesRoutes = require('../server/routes/categories')
const ordersRoutes = require('../server/routes/orders')
const reviewsRoutes = require('../server/routes/reviews')
const adminRoutes = require('../server/admin/routes/admin')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use('/uploads', express.static(path.join(__dirname, '../server/uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/admin', adminRoutes)

app.use(errorHandler)

connectDB().catch((error) => {
    console.error('Database connection error:', error)
})

module.exports = serverless(app)
