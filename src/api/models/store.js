const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema(
  {
    storeName: { type: String, required: true },
    address: { type: String, require: true },
    items: [{ type: mongoose.Types.ObjectId, ref: 'products', required: false }]
  },
  {
    timestamps: true,
    collection: 'stores'
  }
)

const Store = mongoose.model('stores', storeSchema, 'stores')

module.exports = Store
