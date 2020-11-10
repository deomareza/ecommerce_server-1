function errorHandler(err, req, res, next) {
  let status = err.status || 500
  let message = err.message || `INTERNAL SERVER ERROR`

  if(err.name === 'SequelizeValidationError') {
    let errors = []

    err.errors.forEach(error => {
      errors.push(error.message)
    })
    status = 400
    message = errors.join(', ')

  } else if (err.name === 'SequelizeUniqueConstraintError'){
    status = 400
  }
  
  else {
    console.log(err.name)
  }

  res.status(status).json({ message })

}

module.exports = errorHandler