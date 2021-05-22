# Backend Trello Clone Application

# REST API

REST API cho ứng dụng trello được mô tả bên dưới.

## Đăng ký

### Request

`POST /api/auth/register`

    curl --location --request POST 'http://localhost:3003/api/auth/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "thinhtd",
        "fullname": "Tran Duc Thinh",
        "password": "123456",
        "phone": "0335644677"
    }'


### Response

    {
        "fullname": "Tran Duc Thinh",
        "username": "usertest",
        "phone": "0335644677",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzExMCwiZXhwIjoxNjI0Mjk1MTEwfQ.In1Wp8eltodibhZY3Ls3t7cDvjyyUffUvJ2GKfwLmmo"
    }

## Đăng nhập

### Request

`/api/auth/login`

    curl --location --request POST 'http://localhost:3003/api/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "usertest",
        "password": "123456"
    }'

### Response

    {
        "fullname": "Tran Duc Thinh",
        "username": "usertest",
        "phone": "0335644677",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI"
    }

## Lấy danh sách board đã đóng

### Request

`/api/board/closed-board`

    curl --location --request GET 'http://localhost:3003/api/board/closed-board' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "Board"
    }'

## Response

    [
        {
            "member": [
                "60a939c5ab6ecb4e0cade7e7"
            ],
            "star": false,
            "closed": true,
            "column": [],
            "_id": "60a93b7dab6ecb4e0cade7ea",
            "title": "Second Board",
            "user": "60a939c5ab6ecb4e0cade7e7",
            "createdAt": "2021-05-22T17:12:29.442Z",
            "updatedAt": "2021-05-22T17:12:29.442Z",
            "__v": 0
        },
        {
            "member": [
                "60a939c5ab6ecb4e0cade7e7"
            ],
            "star": false,
            "closed": true,
            "column": [],
            "_id": "60a93b81ab6ecb4e0cade7eb",
            "title": "Third Board",
            "user": "60a939c5ab6ecb4e0cade7e7",
            "createdAt": "2021-05-22T17:12:33.108Z",
            "updatedAt": "2021-05-22T17:12:33.108Z",
            "__v": 0
        }
    ]

## Tạo bảng

## Request

`/api/board`

    curl --location --request POST 'http://localhost:3003/api/board/' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "Third Board"
    }'

## Response

    {
        "member": [
            "60a939c5ab6ecb4e0cade7e7"
        ],
        "star": false,
        "closed": false,
        "column": [],
        "_id": "60a93b81ab6ecb4e0cade7eb",
        "title": "Third Board",
        "user": "60a939c5ab6ecb4e0cade7e7",
        "createdAt": "2021-05-22T17:12:33.108Z",
        "updatedAt": "2021-05-22T17:12:33.108Z",
        "__v": 0
    }

