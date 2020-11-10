const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/')
const { queryInterface } = sequelize
const { User } = require('../models/')

/**
 * TODO : Create a beforeall to generate User
 */
beforeAll(done => {
  User.create( { email : 'test@mail.com', password : 'default', role : 'user', createdAt : new Date(), updatedAt : new Date() })
  .then( _ => {
    done()
  })
  .catch(error => {
    done(error)
  })

})


afterAll( done => {
  queryInterface.bulkDelete(`Users`, null, {})
  .then(_=> {
    done()
  })
  .catch(error => {
    done(error)
  })
})


// describe(`registration`, () => {

//   it(`New User Register`, (done) => {
//     request(app)
//     .post('/user/register')
//     .send( { email : 'test@mail.com', password : 'default'} )
//     .then(response => {
//       const { body, status } = response

//       expect(status).toBe(201)
//       expect(body).toHaveProperty('id', expect.any(Number))
//       expect(body).toHaveProperty('email', 'test@mail.com')

//       done()
//     })
//     .catch(err => {
//       done(err)
//     })
//   })

//   it('test register email already exists', (done) => {
//     request(app)
//     .post('/user/register')
//     .send( { email : 'test@mail.com', password : 'default'} )
//     .then(response => {
//       const { body, status } = response

//       expect(status).toBe(400)
//       expect(body).toHaveProperty('message', 'This email has already been used')
//       done()
//     })
//     .catch(err => {
//       done(err)
//     })
//   })

//   it(`test register missing email`, (done) => {
//     request(app)
//     .post('/user/register')
//     .send({ email : '', password : 'default'})
//     .then(response => {
//       const { body, status } = response
//       expect(status).toBe(400)
//       expect(body.message).toContain('Email is required')
//       done()
//     })
//     .catch(err => {
//       done(err)
//     })
//   })

//   it(`test register invalid email`, (done) => {
//     request(app)
//     .post('/user/register')
//     .send({ email : 'test@mail', password : 'default' })
//     .then(response => {
//       const { body, status } = response
//       expect(status).toBe(400)
//       expect(body.message).toContain('Invalid email')
//       done()
//     })
//     .catch(err => {
//       done(err)
//     })
//   })


//   it(`test register missing password`, (done) => {
//     request(app)
//     .post('/user/register')
//     .send({ email : 'test2@mail.com', password : '' })
//     .then(response => {
//       const { body, status } = response
//       expect(status).toBe(400)
//       expect(body.message).toContain('Password is required')
//       done()
//     })
//     .catch(err => {
//       done(err)
//     })
//   })


//   it(`test register password length < 6`, (done) => {
//     request(app)
//     .post('/user/register')
//     .send({ email : 'test2@mail.com', password : 'def' })
//     .then(response => {
//       const { body, status } = response
//       expect(status).toBe(400)
//       expect(body.message).toContain('Minimum password length is 6 characters')
//       done()
//     })
//     .catch(err => {
//       done(err)
//     })
//   })

// })


describe(`User Login`, () => {

  /**
   * 1. User login successfully
   * 2. Email doesnt exists
   * 3. Invalid password
   * 4. Missing fields
   */

  test(`User login Success`, (done) => {
    request(app)
    .post('/user/login')
    .send({ email : 'test@mail.com', password : 'default' })
    .then(response => {
      const { body, status } = response
      expect(status).toBe(200)
      expect(body).toHaveProperty('access_token', expect.any(String))
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test(`test Login email wrong email`, (done) => {
    request(app)
    .post('/user/login')
    .send({ email : 'wrong@mail.com', password : 'default' })
    .then(response => {
      const { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', `Wrong username or password`)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test(`test Login email wrong password`, (done) => {
    request(app)
    .post('/user/login')
    .send({ email : 'test@mail.com', password : 'defaultSalah' })
    .then(response => {
      const { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', `Wrong username or password`)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test(`test Login missing email`, (done) => {
    request(app)
    .post('/user/login')
    .send({ email : '', password : 'defaultSalah' })
    .then(response => {

      const { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', `Wrong username or password`)
      done()

    })
    .catch(err => {
      done(err)
    })
  })

  test(`test Login missing password`, (done) => {
    request(app)
    .post('/user/login')
    .send({ email : 'test@mail.com', password : '' })
    .then(response => {

      const { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', `Wrong username or password`)
      done()

    })
    .catch(err => {
      done(err)
    })
  })


})