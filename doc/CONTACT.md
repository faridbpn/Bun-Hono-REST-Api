# Contact API Spec

## Create Contact


Endpoint: POST /api/contacts

Request Header :
-Authorization : token

Request Body :

```json
{
    "first_name" : "nama depan",
    "last_name" : "nama belakang",
    "email" : "farid@gmail.com",
    "phone" : "0899999999"
}
```

Response Body :

```json
{
   "data" : {
    "id" : 1,
    "first_name" : "nama depan",
    "last_name" : "nama belakang",
    "email" : "farid@gmail.com",
    "phone" : "0899999999"
   }
}
```

## Get Contact

Endpoint: GET /api/contacts/{idContacts}

Request Header :
-Authorization : token

Response Body :

```json
{
   "data" : {
    "id" : 1,
    "first_name" : "nama depan",
    "last_name" : "nama belakang",
    "email" : "farid@gmail.com",
    "phone" : "0899999999"
   }
}
```


## Update Contact

Endpoint: PUT /api/contacts/{idContact}

Request Header :
-Authorization : token

Request Body :

```json
{
   "data" : {
    "first_name" : "nama depan",
    "last_name" : "nama belakang",
    "email" : "farid@gmail.com",
    "phone" : "0899999999"
   }
}
```

Response Body :

```json
{
   "data" : {
    "id" : 1,
    "first_name" : "nama depan",
    "last_name" : "nama belakang",
    "email" : "farid@gmail.com",
    "phone" : "0899999999"
   }
}
```

## Remove Contact

Endpoint: DELETE /api/contacts/{idContacts}

Request Header :
-Authorization : token

Response Body :

```json
    "data" : true
```

## Search Contact

Endpoint: GET /api/contacts

Request Header :
-Authorization : token

Query Parameter :
-name : string, search ke first_name atau last_name
-email : string, search ke email
-phone : string, search ke phone
-page : number, default 1
-size : number, default 10

Response Body :

```json
{
    "data" : [
        {
            "first_name" : "nama depan",
            "last_name" : "nama belakang",
            "email" : "farid@gmail.com",
            "phone" : "0899999999"
        },
        {
            "first_name" : "nama depan",
            "last_name" : "nama belakang",
            "email" : "farid@gmail.com",
            "phone" : "0899999999"
        }
    ],
    "paging" : {
        "current_page" : 1,
        "total_page" : 10,
        "size" : 10
    }
}
```