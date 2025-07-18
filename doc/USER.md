# User API Spec

## Register User
Endpoint : POST /api/users

Request Body :

```json
{
    "username" : "farid",
    "password" : "123",
    "name" : "faridbpn"
}
```

Response Body (Success) :

```json
{
    "username" : "farid",
    "name" : "faridbpn"
}
```

Response Body (Failed) :

```json
{
    "errors" : "Username Must Not Blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username" : "farid",
    "name" : "faridbpn"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "username" : "farid",
        "name" : "faridbpn",
        "token" : "token"
    }
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
-Authorization : token

Response Body (Success) :

```json
{
    "data" : {
        "username" : "farid",
        "name" : "faridbpn",
        "token" : "token"
    }
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
-Authorization : token

Response Body :

```json
{
    "data" : {
        "username" : "kalo mau update nama",
        "password " : "kalo mau update password",
    }
}

Response Body (Success) :

```json
{
    "data" : {
        "username" : "kalo mau update nama",
        "password " : "kalo mau update password",
    }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :
-Authorization : token

Response Body (Success) :

```json
{
    "data" : true
}
```











