# EndPoint List : 

`POST /product`
`GET /product`
`PUT /product/:id`
`DELETE /product/:id`

`POST /user/register`
`POST /user/login`
`POST /user/login/customer`
`POST /user/checkout`

`GET /user/cart`
`POST /user/cart/:id`
`PATCH /user/cart/:id`
`DELETE /user/cart/:id`



# Create New Product

Create new product and insert to database

### Methods

`POST`

### HTTP Request

```
/product
```
### Request parameters

NO URL Query or Parameters needed

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |

### Request body

| Property | Type | Description |
|:---------|:-----|:------------|
| name | String | Name of the Product |
| image_url | String | Url for image of the product |
| price | Integer | Price of the product |
| stock | Integer | Stock of the product |


### Example

##### Request

```json
  {
    "name" : "Boots",
    "image_url" : "http://bootsimages/1.jpg",
    "price" : 500000,
    "stock" : 10
  }
```

##### Response
**SUCCESS :**

Status : `201`

```json
  {
    "message" : "Item has been added"
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```


# Fetch Products Data

Get all products data from database

### Methods

`GET`

### HTTP Request

```
/product
```
### Request parameters

NO URL Query or Parameters needed

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |

### Request body

NO BODY required


### Example

##### Response
**SUCCESS :**

Status : `200`

```json
  [
    {
      "name" : "Boots",
      "image_url" : "http://bootsimages/1.jpg",
      "price" : 500000,
      "stock" : 10
    }
  ]
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```

**or**

Status : `500`

```json
  {
    "message" : "INTERNAL SERVER ERROR"
  }
```


# Update Product

Update Product Database

### Methods

`PUT`

### HTTP Request

```
/product/:id
```
### Request parameters

Id of product we want to update [INTEGER]

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |

### Request body

| Property | Type | Description |
|:---------|:-----|:------------|
| name | String | Name of the Product |
| image_url | String | Url for image of the product |
| price | Integer | Price of the product |
| stock | Integer | Stock of the product |


### Example

##### Request

```json
  {
    "name" : "Boots",
    "image_url" : "http://bootsimages/1.jpg",
    "price" : 500000,
    "stock" : 10
  }
```

##### Response
**SUCCESS :**

Status : `200`

```json
  {
    "message" : "Item has been updated"
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```


# Delete Product

Delete Product from Database

### Methods

`DELETE`

### HTTP Request

```
/product/:id
```
### Request parameters

Id of product we want to update [INTEGER]

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |

### Request body

NO body is required


### Example

##### Response
**SUCCESS :**

Status : `200`

```json
  {
    "message" : "Item has been deleted"
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```

# User Register

New user register

### Methods

`POST`

### HTTP Request

```
/user/register
```
### Request parameters

NO URL Query or Parameters needed

### Request headers

NO Headers needed

### Request body


| Property | Type | Description |
|:---------|:-----|:------------|
| email | String | User email address |
| password | String | User password |
| [ role ] | String | User role (admin or user) |

Note : if role is not defined, it defaults as user


### Example

##### Response
**SUCCESS :**

Status : `201`

```json
  {
    "id" : 1,
    "email" : "test@email.com",
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```


# Admin Login

Admin login

### Methods

`POST`

### HTTP Request

```
/user/login
```
### Request parameters

NO URL Query or Parameters needed

### Request headers

NO Headers needed

### Request body


| Property | Type | Description |
|:---------|:-----|:------------|
| email | String | User email address |
| password | String | User password |



### Example

##### Response
**SUCCESS :**

Status : `201`

```json
  {
    "access_token" : "access_token"
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message"
  }
```

**or**

Status : `500`

```json
  {
    "message" : "INTERNAL SERVER ERROR"
  }
```

# Customer Login

Customer login

### Methods

`POST`

### HTTP Request

```
/user/login/customer
```
### Request parameters

NO URL Query or Parameters needed

### Request headers

NO Headers needed

### Request body


| Property | Type | Description |
|:---------|:-----|:------------|
| email | String | User email address |
| password | String | User password |



### Example

##### Response
**SUCCESS :**

Status : `201`

```json
  {
    "access_token" : "access_token"
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message"
  }
```

**or**

Status : `500`

```json
  {
    "message" : "INTERNAL SERVER ERROR"
  }
```


# Add to Cart

Adding Product to User Cart Data. This method will add quantity if there's duplicate

### Methods

`POST`

### HTTP Request

```
/user/cart/:id
```
### Request parameters

Id of product we want to add to Cart [INTEGER]

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |


##### Response
**SUCCESS :**

Status : `200`

```json
  {
    "id" : 2,
    "UserId" : 2,
    "ProductId" : 1,
    "quantity" : 1
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```

# Get Cart

Get User Cart Data

### Methods

`GET`

### HTTP Request

```
/user/cart
```
### Request parameters

NO URL Query or Parameters needed

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |

### Request body

No Request Body

##### Response
**SUCCESS :**

Status : `200`

```json
{
  "userCart": [
    {
      "id": 5,
      "UserId": 2,
      "ProductId": 5,
      "quantity": 1,
      "Product": {
        "id": 5,
        "name": "T-Shirt Slub Jersey Crew Neck Lengan Pendek",
        "image_url": "https://im.uniqlo.com/images/common/pc/goods/422996/item/00_422996_middles.jpg",
        "price": 99000,
        "stock": 7
      }
    },
    {
      "id": 4,
      "UserId": 2,
      "ProductId": 4,
      "quantity": 1,
      "Product": {
        "id": 4,
        "name": "T-Shirt Dry Crew Neck Lengan Pendek",
        "image_url": "https://im.uniqlo.com/images/common/pc/goods/431599/item/47_431599_middles.jpg",
        "price": 149000,
        "stock": 10
      }
    }
  ]
}
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```



# Update Cart Quantity

Update Cart Quantity

### Methods

`PATCH`

### HTTP Request

```
/user/cart/:id
```
### Request parameters

Id of product we want to update [INTEGER]

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |


### Request body


| Property | Type | Description |
|:---------|:-----|:------------|
| quantity | Integer | Quantity of Product in Cart |



### Example

##### Response
**SUCCESS :**

Status : `200`

```json
  {
    "id": 5,
    "UserId": 2,
    "ProductId": 5,
    "quantity": 2,
    "createdAt": "2020-11-17T04:06:49.201Z",
    "updatedAt": "2020-11-17T04:40:34.020Z"
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```


# Delete Cart Item

Deleting Item from User Cart

### Methods

`DELETE`

### HTTP Request

```
/user/cart/:id
```
### Request parameters

Id of product we want to delete [INTEGER]

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |


### Request body
No Request Body Needed

### Example

##### Response
**SUCCESS :**

Status : `200`

```json
  {
    "message" : "Item has been deleted"
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```


# User Checkout

User checkout items from their cart

### Methods

`POST`

### HTTP Request

```
/user/checkout
```
### Request parameters

No URL params

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |


### Request body


| Property | Type | Description |
|:---------|:-----|:------------|
| userCart | Array | An array of Object containing user cart information |



### Example

##### Response
**SUCCESS :**

Status : `200`

```json
  {
    "message" : "Transaction successful"
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```


# Checkout

User checkout their shopping cart

### Methods

`POST`

### HTTP Request

```
/user/checkout
```
### Request parameters

No URL Request

### Request headers

| Name | Value |
|:-----|:------|
|Access token | 'access token value' |


### Request Body

| Name | Type | Description |
|:----- |:-----|:-----|
|userCart|Array| An Array of Object that contains users' cart data |

##### Response
**SUCCESS :**

Status : `200`

```json
  {
    "message": "Transaction successful"
  }
```
**ERROR :**

Status : `400`

```json
  {
    "message" : "BAD REQUEST"
  }
```