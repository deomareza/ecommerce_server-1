const { Product } = require('../models/')

class ProductController{

  static async fetchProducts (req, res, next) {
    try {
      const products = await Product.findAll({
        attributes : {
          exclude : [ 'createdAt', 'updatedAt' ]
        },
        order: [
          ['name', 'ASC']
        ]
      })

      res.status(200).json(products)

    } catch (error) {
      next(error)
    }
  }

  static async fetchOneProduct (req, res, next) {
    try {
      const id = +req.params.id
      const product = await Product.findByPk( id, {
        attributes : {
          exclude : [ 'createdAt', 'updatedAt' ]
        }
      })

      res.status(200).json(product)
      
    } catch (error) {
      next(error)
    }
  }

  static async createProduct(req, res, next) {
    try {

      let { name, image_url, price, stock } = req.body  
      // price = +price
      // stock = +stock

      const newProduct = await Product.create({ 
        name, 
        image_url, 
        price, 
        stock 
      })
      
      if(newProduct){
        res.status(201).json({ message : `Item has been added`})
      } else {
        next({
          status : 500,
          message : `Error when creating new product`
        })
      }

    } catch (error) {

      next(error)
    }

  }

  static async updateProduct(req, res, next) {
    try {
      const id = +req.params.id
      const { name, image_url, price, stock } = req.body


      const updated = await Product.update({
        name, image_url, price, stock
      }, { where : { id }})

      if( updated[0]>0 ) {
        res.status(200).json({ message : 'Item has been updated' })

      } else {
        next()
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = +req.params.id

      await Product.destroy({ where : { id }})

      res.status(200).json({ message : `Item has been deleted`})

    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController