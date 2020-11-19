const router = require('express').Router()
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const checkProduct = require('../middlewares/checkProduct')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login/customer', UserController.loginCustomer)

router.use(authentication)
router.get('/cart', UserController.fetchUserCart)
router.get('/history', UserController.fetchUserHistory)
router.post('/checkout', UserController.checkout)

router.post('/cart/:id', checkProduct, UserController.addToCart)
router.patch('/cart/:id', checkProduct, UserController.updateCartQty)
router.delete('/cart/:id', checkProduct, UserController.removeFromCart)

module.exports = router

