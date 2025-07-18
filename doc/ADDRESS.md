# Address API Spec

## Create Address

Endpoint : POST /api/contacts/{idContact}/addresses

Request Header :
-Autorization : token

Request Body :

```json
{
    "street" : "jalan",
    "city" : "kota",
    "provience" : "provinsi",
    "country" : "negara",
    "postal_code" : "232345"
}
```

Response Body :

```json
{
    "data" : {
        "id" : 1,
        "street" : "jalan",
        "city" : "kota",
        "provience" : "provinsi",
        "country" : "negara",
        "postal_code" : "232345"
    }
}
```

## Get Address

Endpoint : GET /api/contacts/{idContact}/addresses/{idAddress}

Request Header :
-Autorization : token

Response Body :

```json
{
    "data" : {
        "id" : 1,
        "street" : "jalan",
        "city" : "kota",
        "provience" : "provinsi",
        "country" : "negara",
        "postal_code" : "232345"
    }
}
```

## Update Address

Endpoint : PUT /api/contacts/{idContact}/addresses/{idAddress}

Request Header :
-Autorization : token

Request Body :

```json
{
    "street" : "jalan",
    "city" : "kota",
    "provience" : "provinsi",
    "country" : "negara",
    "postal_code" : "232345"
}
```

Response Body :

```json
{
    "data" : {
        "id" : 1,
        "street" : "jalan",
        "city" : "kota",
        "provience" : "provinsi",
        "country" : "negara",
        "postal_code" : "232345"
    }
}
```

## Remove Address

Endpoint : DELETE /api/contacts/{idContact}/addresses/{idAddress}

Request Header :
-Autorization : token

Response Body :

```json
{
    "data" : true
}
```

## List Address

Endpoint : GET /api/contacts/{idContact}/addresses

Request Header :
-Autorization : token

Response Body :

```json
{
    "data" : [
        {
        "id" : 1,
        "street" : "jalan",
        "city" : "kota",
        "provience" : "provinsi",
        "country" : "negara",
        "postal_code" : "232345"
        },
        {
        "id" : 2,
        "street" : "jalan",
        "city" : "kota",
        "provience" : "provinsi",
        "country" : "negara",
        "postal_code" : "232345"
        }
    ]
}
```