const User = require('../api/models/user')
const { verifyJwt } = require('../api/utils/jwt')
const jwt = require('jsonwebtoken')

const isAuth = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ')
    const { id } = verifyJwt(token)
    const user = await User.findById(id)

    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json('Sin autorizacion')
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ')
    console.log(token)
    const { id } = verifyJwt(token)
    const user = await User.findById(id)

    if (user.admin === true) {
      return next()
    }
    return res.statud(401).json('No eres admin')
  } catch (error) {
    return res.status(401).json('No eres admin')
  }
}

const isMyUser = async (req, res, next) => {
  try {
    
    const { id } = req.params
    const [, token] = req.headers.authorization.split(' ')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.id !== id) {
      return res.status(403).json('Solo puedes modificar tu propio usuario')
    }
    return next()
  } catch (error) {
    return res.status(401).json("sin autorizacion")
  }
}

module.exports = { isAuth, isAdmin, isMyUser }
