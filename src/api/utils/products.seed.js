const mongoose = require('mongoose')
const Product = require('../models/product')
const products = require('../../data/products')

const lanzarSemilla = async () => {
  try {
    await mongoose.connect("mongodb+srv://proyecto7:s1cV5XCwVIwKGEOe@cluster0.alg2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    await Product.collection.drop()
    await Product.insertMany(products)
    console.log('Carga de semilla completada')
    await mongoose.disconnect()
  } catch (error) {
    console.log('Error al lanzar semila products')
  }
}
 lanzarSemilla()