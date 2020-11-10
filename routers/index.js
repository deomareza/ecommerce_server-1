const router = require('express').Router()
const userRouter = require('./userRoutes')
const productRouter = require('./productRoutes')
const authentication = require('../middlewares/authentication')


router.use('/user', userRouter)

router.use(authentication)

router.use('/product', productRouter)

module.exports = router