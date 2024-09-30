//
//
//
// 
// Dos relaciones entre colecciones, la idea es que los usuarios tengan un dato relacionado también
// CRUD completo de todas las colecciones
// 2 roles de usuario con diferentes permisos
// README.md con la documentación del proyecto, indicando los endpoints y que hace cada uno
// Los usuarios sólo pueden ser creados con rol user
// Crearemos nuestro primer admin cambiando su rol directamente en la BBDD
// Los admins pueden modificar a un usuario normal para cambiar su rol y hacerlo admin también
// Los admins pueden eliminar usuarios, pero un usuario se puede eliminar a si mismo
// Existe un middleware que compruebe el token que se aporta en la petición para dejar pasar o mostrar un mensaje de error

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
