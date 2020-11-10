const bcrypt = require('bcryptjs')

function generateHash ( password ){
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash
}

function verifyPassword ( password, hashPassword ){
  return bcrypt.compareSync(password, hashPassword)
}


module.exports = { generateHash, verifyPassword }