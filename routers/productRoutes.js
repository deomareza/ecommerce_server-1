const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')
const checkProduct = require('../middlewares/checkProduct')

router.get('/', ProductController.fetchProducts)

// Admin Power!! //
router.post('/', authorization, ProductController.createProduct)
router.get('/:id', authorization, checkProduct, ProductController.fetchOneProduct)
router.put('/:id', authorization, checkProduct, ProductController.updateProduct)
router.delete('/:id', authorization, checkProduct, ProductController.deleteProduct)

module.exports = router
