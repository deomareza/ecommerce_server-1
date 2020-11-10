const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')
const { Product } = require('../models/')

let access_token
let user_access_token

const adminEmail = `test@mail.com`
const userPassword = `1234567`

let productId

beforeAll( done => {


  queryInterface.bulkInsert('Users', [
    { email : adminEmail, password : userPassword, role : `admin`, createdAt : new Date(), updatedAt : new Date()},
    { email : `user@mail.com`, password : userPassword, role : `user`, createdAt : new Date(), updatedAt : new Date()}
  ], {})
  .then(user => {
    access_token = generateToken( { email : adminEmail } )
    user_access_token = generateToken( { email : `user@mail.com`} )
    console.log(access_token)

    return Product.create({
      name : "testProduct", image_url : "http://www.google.com", price : 30000, stock : 10
    }, {returning : true})

  })
  .then(data => {
    productId = data.id
    console.log(productId, '<<< Product Id')
    done()
  })
  .catch(err => {
    done(err)
  })

})

afterAll( done => {
  
  queryInterface.bulkDelete('Products', null, {})
  .then(_ =>{
    return queryInterface.bulkDelete('Users', null, {})   
  })
  .then(_=> {
    user_access_token = null
    access_token = null
    done()
  })
  .catch(err => {
    done(err)
  })
})



describe(`Insert New Products /product`, () => {
  /**
   * 1. Successk
   * 2. Authorization error : Admin only
   * 3. Missing input fields
   */

  test(`Success Insert new Product`, (done) => {

    request(app)
    .post(`/product`)
    .set('access_token', access_token)
    .send({name : 'Product 1', image_url : 'https://www.google.com', price : 30000, stock : 10})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(201)
      expect(body).toHaveProperty('message', 'Item has been added')
      done()
    })
    .catch(err => {
      done(err)
    })
    
  })


  test(`No access token`, (done) => {

    request(app)
    .post(`/product`)
    .send({name : 'Product 1', image_url : 'https://www.google.com', price : 30000, stock : 10})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Unauthorized')
      done()
    })
    .catch(err => {
      done(err)
    })
    
  })

  test(`User try to insert`, (done) => {

    request(app)
    .post(`/product`)
    .set('access_token', user_access_token)
    .send({name : 'Product 1', image_url : 'https://www.google.com', price : 30000, stock : 10})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Unauthorized')
      done()
    })
    .catch(err => {
      done(err)
    })
    
  })

  test(`Admin insert price below 0`, (done) => {

    request(app)
    .post(`/product`)
    .set('access_token', access_token)
    .send({name : 'Product 1', image_url : 'https://www.google.com', price : -100, stock : 10})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Price must be greater than 0')
      done()
    })
    .catch(err => {
      done(err)
    })
    
  })

  test(`Admin insert stock below 0`, (done) => {

    request(app)
    .post(`/product`)
    .set('access_token', access_token)
    .send({name : 'Product 1', image_url : 'https://www.google.com', price : 30000, stock : -10})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Stock must be greater than 0')
      done()
    })
    .catch(err => {
      done(err)
    })
    
  })


  test(`Missing fields`, (done) => {

    request(app)
    .post(`/product`)
    .set('access_token', access_token)
    .send({name : '', image_url : '', price : '', stock : ''})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body.message).toContain('Name is required')
      expect(body.message).toContain('Image Url is required')
      done()
    })
    .catch(err => {
      done(err)
    })
    
  })

  test(`Stock diisi string`, (done) => {

    request(app)
    .post(`/product`)
    .set('access_token', access_token)
    .send({name : 'Image', image_url : 'https://www.google.com', price : 'asdfasdf', stock : ''})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body.message).toContain('Please insert number')
      done()
    })
    .catch(err => {
      done(err)
    })
    
  })

})

describe(`Update Product /product`, () => {

  test(`Update Product Data`, (done) => {
    request(app)
    .put(`/product/${productId}`)
    .set(`access_token`, access_token)
    .send({name : 'Updated Item', image_url : 'https://www.google.com', price : 50000, stock : 40})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(200)
      expect(body).toHaveProperty('message', 'Item has been updated')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test(`User coba update Product Data`, (done) => {
    request(app)
    .put(`/product/${productId}`)
    .set(`access_token`, user_access_token)
    .send({name : 'Updated Item', image_url : 'https://www.google.com', price : 50000, stock : 40})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Unauthorized')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test(`No access token`, (done) => {
    request(app)
    .put(`/product/${productId}`)
    // .set(`access_token`, user_access_token)
    .send({name : 'Updated Item', image_url : 'https://www.google.com', price : 50000, stock : 40})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Unauthorized')
      done()
    })
    .catch(err => {
      done(err)
    })
  })


  test(`admin input invalid Url `, (done) => {
    request(app)
    .put(`/product/${productId}`)
    .set(`access_token`, access_token)
    .send({name : 'Updated Item', image_url : 'asdfsadf', price : 50000, stock : 40})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Image Url is invalid')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test(`admin input price < 0 `, (done) => {
    request(app)
    .put(`/product/${productId}`)
    .set(`access_token`, access_token)
    .send({name : 'Updated Item', image_url : 'https://www.google.com', price : -50000, stock : 40})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Price must be greater than 0')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test(`admin input stock < 0 `, (done) => {
    request(app)
    .put(`/product/${productId}`)
    .set(`access_token`, access_token)
    .send({name : 'Updated Item', image_url : 'https://www.google.com', price : 50000, stock : -40})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Stock must be greater than 0')
      done()
    })
    .catch(err => {
      done(err)
    })
  })


  test(`admin input price with String`, (done) => {
    request(app)
    .put(`/product/${productId}`)
    .set(`access_token`, access_token)
    .send({name : 'Updated Item', image_url : 'https://www.google.com', price : 'asdfasdf', stock : 40})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Please insert number')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test(`admin input stock with String `, (done) => {
    request(app)
    .put(`/product/${productId}`)
    .set(`access_token`, access_token)
    .send({name : 'Updated Item', image_url : 'https://www.google.com', price : 300, stock : 'asdfasdf'})
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Please insert number')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

})

describe('Delete Product /product', () => {

  test(`product id not found`, done => {
    request(app)
    .delete(`/product/0`)
    .set('access_token', access_token)
    .then(response => {
      const { body, status } = response

      expect(status).toBe(400)
      expect(body).toHaveProperty('message', `Product not found`)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test('No access token', done => {
    request(app)
    .delete(`/product/${productId}`)
    // .set('access_token', user_access_token)
    .then(response => {
      const { body, status } = response

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', `Unauthorized`)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test('User delete Product', done => {
    request(app)
    .delete(`/product/${productId}`)
    .set('access_token', user_access_token)
    .then(response => {
      const { body, status } = response

      expect(status).toBe(401)
      expect(body).toHaveProperty('message', `Unauthorized`)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  test('Admin delete Product', done => {
    request(app)
    .delete(`/product/${productId}`)
    .set('access_token', access_token)
    .then(response => {
      const { body, status } = response

      expect(status).toBe(200)
      expect(body).toHaveProperty('message', `Item has been deleted`)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

})