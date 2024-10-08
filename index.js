
require('dotenv').config()
const express = require("express")
const { connectDB } = require('./src/config/db')
const productRouter = require('./src/api/routes/product')
const storeRouter = require('./src/api/routes/store')
const userRoutes = require('./src/api/routes/user')
const app = express()

connectDB()

app.use(express.json())


app.use("/api/v1/products", productRouter)
app.use("/api/v1/stores", storeRouter)
app.use("/api/v1/users", userRoutes)



app.use('*', (req, res, next) => {
  return res.status(404).json('Rute not found')
})

app.listen(3000, () => {
  console.log('El servidor está funcionando en: http://localhost:3000')
})
