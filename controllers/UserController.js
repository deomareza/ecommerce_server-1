const { User, Cart, Product, sequelize } = require('../models/')
const { verifyPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
  static async register(req, res, next) {
    try {

      let { email, password, role } = req.body

      let user = await User.create({ email, password, role})
      res.status(201).json( { id : user.id, email : user.email } )
            
    } catch (error) {
      next(error)
    }

  }

  static async login(req, res, next) {
    try {
      
      const { email, password } = req.body
      console.log(email, password)
      const user = await User.findOne({ where : { email }})


      if(user && verifyPassword(password, user.password) && user.role === "admin"){    
        const payload = {
          id : user.id,
          email : user.email
        }
        const token = generateToken( payload )
        
        res.status(200).json({ access_token : token })

      } else {

        next({
          status : 400,
          message : `Wrong username or password`
        })

      }


    } catch (error) {
      next(error)
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      
      const { email, password } = req.body
      console.log(email, password)
      const user = await User.findOne({ where : { email }})


      if(user && verifyPassword(password, user.password) && user.role === "customer"){    
        const payload = {
          id : user.id,
          email : user.email
        }
        const token = generateToken( payload )
        
        res.status(200).json({ access_token : token })

      } else {

        next({
          status : 400,
          message : `Wrong username or password`
        })

      }


    } catch (error) {
      next(error)
    }
  }

  static async fetchUserCart (req, res, next) {
    try {
      const { id } = req.loggedInUser

      const userCart = await Cart.findAll({ 
        where: { UserId: id },
        include: [
          {
            model: Product,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        order: [[ 'createdAt', 'ASC' ]]
      })

      res.status(200).json({ userCart })

    } catch (error) {
      next(error)
    }
  }

  static async addToCart (req, res, next) {
    try {
      const { id } = req.loggedInUser
      const ProductId = req.params.id

      let userCart = await Cart.findOne({
        where: { 
          UserId: id,
          ProductId
        },
        include: [
          {model: Product, attributes: {
            include: ['stock']
          }}
        ]
      })

      if (userCart) {
        if( userCart.Product.stock > userCart.quantity ) {
          await Cart.update({
            quantity: userCart.quantity+1
          }, {
            where: { 
              UserId: id,
              ProductId
            }
          })
        }

      } else {
        console.log('cant find Cart')
        userCart = await Cart.create({
          UserId: id,
          ProductId,
          quantity: 1
        })
      }

      res.status(200).json( userCart )

    } catch (error) {
      next(error)
    }
  }

  static async updateCartQty (req, res, next) {
    try {
      const { id } = req.loggedInUser
      const ProductId = req.params.id
      const { quantity } = req.body
      console.log(req.body)

      const product = await Product.findByPk( +ProductId )
      console.log(product.stock, quantity)

      if(product.stock >= quantity) {
        const userCart = await Cart.update({
          quantity
        },{
          where: { 
            UserId: id,
            ProductId
          },
          returning: true
        })
  
        res.status(200).json( userCart[1][0] )

      } else {
        next({
          status: 400,
          message: `Product Stock is not enough for requested quantity`
        })
      }


    } catch (error) {
      next(error)
    }
  }

  static async removeFromCart (req, res, next) {
    try {
      const { id } = req.loggedInUser
      const ProductId = req.params.id

      await Cart.destroy({
        where: {
          UserId: id,
          ProductId
        }
      })

      res.status(200).json({ message: 'Item has been deleted'})
      
    } catch (error) {
      next(error)
    }
  }

  static async checkout (req, res, next) {
    try {
      const { userCart } = req.body

      console.log(userCart)

      const result = await sequelize.transaction( async (t) => {

        for (let i = 0; i < userCart.length; i++) {
          const item = userCart[i]
          const stock = item.Product.stock - item.quantity
          
          const response = await Product.update({
            stock
          }, {
            where : { id: item.ProductId },
            transaction: t
          })

          if (response[0] === 0){ // No item is changed. Presumably the stock is empty after queue
            throw new Error(`Transaction failed`)
          }
  
          await Cart.destroy({
            where : { id: item.id },
            transaction: t
          })
        }
        
        return 'Success'
      })

      
      if (result) {
        res.status(200).json({ message: 'Transaction successful' })
      } else {
        next()
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController