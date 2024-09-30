const { getAllProducts, getProductById, postProduct, updateProduct, deleteProduct } = require("../controllers/product")


const productRouter = require("express").Router()

productRouter.get("/", getAllProducts)
productRouter.get("/:id", getProductById)
productRouter.post("/", postProduct)
productRouter.put("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)

module.exports= productRouter