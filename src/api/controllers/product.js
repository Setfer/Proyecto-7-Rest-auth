const Product = require('../models/product')

const getAllProducts = async (req, res, next) => {
  try {
    const allProduct = await Product.find()
    return res.status(200).json(allProduct)
  } catch (error) {
    return res.status(400).json('Algo ha salido mal')
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    return res.status(200).json(product)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

const postProduct = async (req, res, next) => {
  try {
    const existingProduct = await Product.findOne({
      productName: req.body.productName
    })

    if (existingProduct) {
      return res
        .status(400)
        .json('Ese producto ya esta añadido.')
    }
    const newProduct = new Product(req.body)
    const ProductSaved = await newProduct.save()
    res.status(201).json(ProductSaved)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const newProduct = new Product(req.body)
    newProduct._id = id
    const up = await Product.findByIdAndUpdate(id, newProduct, { new: true })
    return res.status(200).json(up)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const productDeleted = await Product.findByIdAndDelete(id)
    return res.status(200).json(productDeleted)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct
}
