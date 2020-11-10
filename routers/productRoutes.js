const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')
const checkProduct = require('../middlewares/checkProduct')

router.post('/', authorization, ProductController.createProduct)
router.put('/:id', authorization, checkProduct, ProductController.updateProduct)
router.delete('/:id', authorization, checkProduct, ProductController.deleteProduct)

module.exports = router

