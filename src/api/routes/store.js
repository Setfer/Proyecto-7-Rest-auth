const { getAllStores, getStoreById, postStore, updateStore, deleteStore } = require("../controllers/store")


const storeRouter = require("express").Router()

storeRouter.get("/", getAllStores)
storeRouter.get("/:id", getStoreById)
storeRouter.post("/", postStore)
storeRouter.put("/:id", updateStore)
storeRouter.delete("/:id", deleteStore)

module.exports= storeRouter