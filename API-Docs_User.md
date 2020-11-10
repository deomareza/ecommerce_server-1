User API Documentation
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