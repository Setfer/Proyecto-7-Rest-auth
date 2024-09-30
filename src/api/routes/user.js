const { isAuth, isAdmin, isMyUser } = require('../../middlewares/isAuth')
const {
  register,
  login,
  deleteUser,
  getUsers,
  addShoppingCart,
  updateUser,
  cleanShoppingCart
} = require('../controllers/user')

const userRoutes = require('express').Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.delete('/admin/:id', isAdmin, deleteUser)
userRoutes.delete("/:id", isMyUser, deleteUser)
userRoutes.get('/', isAuth, getUsers)
userRoutes.put('/:id', isMyUser, addShoppingCart)
userRoutes.put('/admin/:id', isAdmin, updateUser)
userRoutes.put ("/deleteshopping/:id", isMyUser, cleanShoppingCart)
module.exports = userRoutes
