const mongoose = require('mongoose')
const Store = require('../models/store')
const stores = require('../../data/stores')

const lanzarSemilla = async () => {
  try {
    await mongoose.connect("mongodb+srv://proyecto7:s1cV5XCwVIwKGEOe@cluster0.alg2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    await Store.collection.drop()
    await Store.insertMany(stores)
    console.log('Carga de semilla completada')
    await mongoose.disconnect()
  } catch (error) {
    console.log('Error al lanzar semila stores')
  }
}
 lanzarSemilla()