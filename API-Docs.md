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

### Optional request headers

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

### Optional request headers

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

### Optional request headers

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

### Optional request headers

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

### Optional request headers

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


# User Login

New user register

### Methods

`POST`

### HTTP Request

```
/user/login
```
### Request parameters

NO URL Query or Parameters needed

### Optional request headers

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