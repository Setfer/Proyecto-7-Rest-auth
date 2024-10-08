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


    if (req.body.items) {
      const oldItems = oldStore.items || []
      const newItems = Array.isArray(req.body.items)
        ? req.body.items
        : [req.body.items]

      const itemsDuplicados = newItems.filter((item) => oldItems.includes(item))

      if (itemsDuplicados.length > 0) {
        return res
          .status(400)
          .json(`El item ya esta incluido: ${itemsDuplicados.join(', ')}`)
      }

      const ItemsActualizados = [...new Set([...oldItems, ...newItems])]
      req.body.items = ItemsActualizados
      const up = await Store.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      )
      return res.status(200).json(up)
    }

    const update = await Store.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )

    return res.status(200).json(update)
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
