const { User } = require('../models/')

async function authorization(req, res, next) {
  try {
    const { email } = req.loggedInUser
    
    const user = await User.findOne({ where : { email }})

    
    if(user.role === 'admin'){
      
      next()

    } else (
      next({
        status : 401,
        message : `Unauthorized`
      })
    )

  } catch (error) {
    next(error)
  }

}

module.exports = authorization