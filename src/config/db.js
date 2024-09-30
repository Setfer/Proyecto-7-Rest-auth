
const mongoose = require("mongoose")

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("La base de datos se ha conectado")
  } catch (error) {
    console.log("Algo ha fallado al conectarse a la base de datos")
  }
}

module.exports = { connectDB }