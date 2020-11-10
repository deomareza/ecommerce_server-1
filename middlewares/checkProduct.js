const { Product } = require('../models/')

async function checkProduct(req, res, next) {
  try {
    const id = +req.params.id
  
    const product = await Product.findByPk(id)

    if(product){
      next()
    } else {
      next({
        status : 400,
        message : `Product not found`
      })
    }
    
  } catch (error) {
    next(error)
  }
}

module.exports = checkProduct