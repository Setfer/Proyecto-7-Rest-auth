const Store = require('../models/store')

const getAllStores = async (req, res, next) => {
  try {
    const allStores = await Store.find().populate('items')
    return res.status(200).json(allStores)
  } catch (error) {
    return res.status(400).json('Algo ha salido mal')
  }
}

const getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params
    const store = await Store.findById(id).populate('items')
    return res.status(200).json(store)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

const postStore = async (req, res, next) => {
  try {
    const newStore = new Store(req.body)
    const storeSaved = await newStore.save()
    res.status(201).json(storeSaved)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

const updateStore = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldStore = await Store.findById(id)
    const newStore = new Store(req.body)
    newStore._id = id
    if (req.body.items) {
      const oldItems = oldStore.items
      const newItem = req.body.items.toString()
      if (oldItems.includes(newItem)) {
        return res
          .status(400)
          .json('El ítem ya esta añadido.')
      }
      newStore.items = [].concat(newItem, oldItems)
      const storeUp = await Store.findByIdAndUpdate(id, newStore, {
        new: true
      })
      return res.status(200).json(storeUp)
    } else {
      items = oldStore.items
      newStore.items = items
      const storeUp = await Store.findByIdAndUpdate(id, newStore, { new: true })
      return res.status(200).json(storeUp)
    }
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

const deleteStore = async (req, res, next) => {
  try {
    const { id } = req.params
    const storeDeleted = await Store.findByIdAndDelete(id)
    return res.status(200).json(storeDeleted)
  } catch (error) {
    return res.status(400).json('Algo ha fallado')
  }
}

module.exports = {
  getAllStores,
  getStoreById,
  postStore,
  updateStore,
  deleteStore
}
