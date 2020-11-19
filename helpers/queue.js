const Queue = require('bull')
const { Product, Cart, sequelize } = require('../models/')
const { setQueues } = require('bull-board')

const checkoutQueue = new Queue('Checkout Queue', 'redis://127.0.0.1:6379')
setQueues([checkoutQueue])

checkoutQueue.process( async (job, done) => {
  try {
    const result = await sequelize.transaction( async (t) => {
      for (let i = 0; i < job.data.length; i++) {
        const item = job.data[i]
        const product = await Product.findByPk(+item.ProductId)
        
        if (product.stock >= item.quantity){
          const stock = product.stock - item.quantity
  
          await Product.update({
            stock
          }, {
            where : { id: item.ProductId },
            transaction: t
          })

          await Cart.destroy({
            where : { id: item.id },
            transaction: t
          })
          
        } else {
          throw new Error(`Product Stock is not enough for your purchase`)
        }
      }

      done(null, { message: 'success' })

    })
    
  } catch (error) {
    done(null, { error })
  }

})

module.exports = {
  checkoutQueue
}