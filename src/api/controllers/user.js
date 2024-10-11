const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/jwt')

const register = async (req, res, next) => {
  try {
    const user = new User(req.body)
    user.admin = false
    const userDuplicated = await User.findOne({ userName: req.body.userName })
    if (userDuplicated) {
      return res.status(400).json('Ese nombre de usuario ya existe')
    }
    const userSaved = await user.save()
    console.log(userSaved)
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body
    const user = await User.findOne({ userName })
    if (!user) {
      return res.status(400).json('Nombre de usuario o contraseña incorrecta')
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id)
      return res.status(200).json({ token, userName })
    } else {
      return res.status(400).json('Nombre de usuario o contraseña incorrecta')
    }
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDelete = await User.findByIdAndDelete(id)
    return res.status(200).json(userDelete)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('shopping')
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('error')
  }
}

const addShoppingCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldUser = await User.findById(id)
    if (req.body.userName || req.body.password || req.body.admin) {
      return res.status(400).json('Solo puede añadir objetos al carro')
    }

    const oldShopping = oldUser.shopping
    const newShopping = req.body.shopping

    const oldShoppingString = oldShopping.map((shopping) => shopping.toString())
    const newShoppingString = newShopping.map((shopping) => shopping.toString())

    const shoppingActualizado = [
      ...new Set([...oldShoppingString, ...newShoppingString])
    ]
    req.body.shopping = shoppingActualizado
    const update = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )

    return res.status(200).json(update)
  } catch (error) {
    return res.status(400).json('No se ha podido añadir el objeto')
  }
}

const cleanShoppingCart = async (req, res, next) => {
  try {
    const { id } = req.params
    if (req.body.userName || req.body.password || req.body.admin) {
      return res.status(400).json('Solo puede eliminar objetos al carro')
    }
    const deleteShopping = req.body.shopping

    const shoppingUp = await User.findByIdAndUpdate(
      id,
      { $pull: { shopping: { $in: deleteShopping } } },
      {
        new: true
      }
    )
    return res.status(200).json(shoppingUp)
  } catch (error) {
    return res.status(400).json('No se ha podido eliminar el objeto')
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const up = await User.findByIdAndUpdate(id, req.body, { new: true })
    console.log(up)
    return res.status(200).json(up)
  } catch (error) {
    return res.status(400).json('error')
  }
}

module.exports = {
  register,
  login,
  deleteUser,
  getUsers,
  addShoppingCart,
  updateUser,
  cleanShoppingCart
}
