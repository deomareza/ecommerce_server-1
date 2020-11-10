const { User } = require('../models')
const { decodeToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers

    if(access_token){
      const decoded = decodeToken(access_token)
      const { email } = decoded
      const user = await User.findOne({ where : { email }})
  
      if( user ){
        
        req.loggedInUser = {
          id : user.id,
          email : user.email
        }
  
        next()
  
      } else {
  
        next({
          status : 401,
          message : `Unauthorized`
        })
  
      }

    } else {

      next({
        status : 401,
        message : `Unauthorized`
      })
    }


  } catch (error) {
    next(error)
  }
}

module.exports = authentication