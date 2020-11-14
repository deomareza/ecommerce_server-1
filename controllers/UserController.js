const { User } = require('../models/')
const { verifyPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
  static async register(req, res, next) {
    try {

      let { email, password, role } = req.body

      if(!role){
        role = "customer"
      }

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


      if(user && verifyPassword(password, user.password)){    
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
}

module.exports = UserController