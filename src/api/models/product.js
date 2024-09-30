const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true }
  },
  {
    timestamps: true,
    collection: 'products'
  }
)

const Product = mongoose.model('products', productSchema, 'products')

module.exports = Product
