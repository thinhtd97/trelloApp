# Backend Trello Clone Application

# REST API

REST API cho ứng dụng trello được mô tả bên dưới.

## Đăng ký

### Body
    {
        "username": "thinhtd",
        "fullname": "Tran Duc Thinh",
        "password": "123456",
        "phone": "0335644677"
    }

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
### Trong đó: 
   * username: Tài khoản dùng để đăng nhập
   * fullname: Họ và tên
   * password: Mật khẩu dùng để đăng nhập
   * phone: Số điện thoại người dùng


## Đăng nhập

### Body
    {
        "username": "usertest",
        "password": "123456"
    }

### Request

`POST /api/auth/login`

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
### Trong đó: 
   * username: Tài khoản dùng để đăng nhập
   * password: Mật khẩu dùng để đăng nhập

## Lấy danh sách board đã đóng

### Body
    {
        "title": "Board"
    }

### Request

`GET /api/board/closed-board`

    curl --location --request GET 'http://localhost:3003/api/board/closed-board' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "Board"
    }'

### Response

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
    ]
### Trong đó: 
   * title: Tiêu đề bảng
   * headers: nhận token từ login, Authorization: Bearer {token}

## Tạo bảng

### Request

`POST /api/board`

    curl --location --request POST 'http://localhost:3003/api/board/' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "Third Board"
    }'

### Response

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
### Trong đó: 
   * title: Tiêu đề bảng
   * headers: nhận token từ login, Authorization: Bearer {token}
## Lấy danh sách bảng

### Request
    `GET /api/board`
    
    curl --location --request GET 'http://localhost:3003/api/board' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "Board"
    }'
### Response
    [
        {
            "member": [
                "60a939c5ab6ecb4e0cade7e7"
            ],
            "star": false,
            "closed": false,
            "column": [],
            "_id": "60a93b62ab6ecb4e0cade7e8",
            "title": "Doing",
            "user": "60a939c5ab6ecb4e0cade7e7",
            "createdAt": "2021-05-22T17:12:02.009Z",
            "updatedAt": "2021-05-22T17:12:02.009Z",
            "__v": 0
        },
    ]
### Trong đó: 
   * headers: nhận token từ login, Authorization: Bearer {token}
     
## Lấy danh sách bảng không có star

### Request
    `GET /api/board/without-star`
    
    curl --location --request GET 'http://localhost:3003/api/board/without-star' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --data-raw ''
    
### Response
     [
        {
            "member": [
                "60a939c5ab6ecb4e0cade7e7"
            ],
            "star": false,
            "closed": false,
            "column": [],
            "_id": "60a93b62ab6ecb4e0cade7e8",
            "title": "Doing",
            "user": "60a939c5ab6ecb4e0cade7e7",
            "createdAt": "2021-05-22T17:12:02.009Z",
            "updatedAt": "2021-05-22T17:12:02.009Z",
            "__v": 0
        },
    ]
### Trong đó: 
   * headers: Authorization: Bearer {token}
      
## Lấy danh sách bảng có star

### Request
    `GET /api/board/star`
    
    curl --location --request GET 'http://localhost:3003/api/board/star' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --data-raw ''
    
### Response
     [
        {
            "member": [
                "60a939c5ab6ecb4e0cade7e7"
            ],
            "star": true,
            "closed": false,
            "column": [],
            "_id": "60a93b79ab6ecb4e0cade7e9",
            "title": "First Board",
            "user": "60a939c5ab6ecb4e0cade7e7",
            "createdAt": "2021-05-22T17:12:25.309Z",
            "updatedAt": "2021-05-22T17:12:25.309Z",
            "__v": 0
        }
    ]
### Trong đó: 
   * headers: Authorization: Bearer {token}      
      
      
## Cập nhật bảng

### Request
    `PUT /api/board/:id`
    
       curl --location --request PUT 'http://localhost:3003/api/board/60a93b79ab6ecb4e0cade7e9' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "Title Updated"
    }'
    
### Response
      {
        "member": [
            "60a939c5ab6ecb4e0cade7e7"
        ],
        "star": true,
        "closed": false,
        "column": [],
        "_id": "60a93b79ab6ecb4e0cade7e9",
        "title": "Title Updated",
        "user": "60a939c5ab6ecb4e0cade7e7",
        "createdAt": "2021-05-22T17:12:25.309Z",
        "updatedAt": "2021-05-23T02:31:13.667Z",
        "__v": 0
    }
### Trong đó: 
   * id: chỉ mục của bảng
   * headers: Authorization: Bearer {token}


 ## Xoá bảng

### Request
    `DELETE /api/board/:id`
    
      curl --location --request DELETE 'http://localhost:3003/api/board/60a93b62ab6ecb4e0cade7e8' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --data-raw ''
    
### Response
      {
        code: 200,
        message: "DELETE SUCCESSFUL."
       }
### Trong đó: 
   * id: chỉ mục của bảng    
   * headers: Authorization: Bearer {token} 
      
## Cập nhật bảng

### Request
    `PUT /api/board/:id`
    
       curl --location --request PUT 'http://localhost:3003/api/board/60a93b79ab6ecb4e0cade7e9' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "Title Updated"
    }'
    
### Response
      {
        "member": [
            "60a939c5ab6ecb4e0cade7e7"
        ],
        "star": true,
        "closed": false,
        "column": [],
        "_id": "60a93b79ab6ecb4e0cade7e9",
        "title": "Title Updated",
        "user": "60a939c5ab6ecb4e0cade7e7",
        "createdAt": "2021-05-22T17:12:25.309Z",
        "updatedAt": "2021-05-23T02:31:13.667Z",
        "__v": 0
    }
### Trong đó: 
   * id: chỉ mục của bảng
   * headers: Authorization: Bearer {token}


## Cập nhật star

### Request
    `PUT /api/board/update-star/:id`
    
      curl --location --request PUT 'http://localhost:3003/api/board/update-star/60a93b79ab6ecb4e0cade7e9' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI'
    
### Response
      {
        code: 200,
        message: "UPDATE STAR SUCCESSFUL."
       }
### Trong đó: 
   * id: chỉ mục của bảng  
   * headers: Authorization: Bearer {token}
  
## Mời thành viên

### Body
    {
        "username": "tientd",
        "idBoard": "60a93b79ab6ecb4e0cade7e9"
    }

### Request
    `POST /api/board/invite`
    
    curl --location --request POST 'http://localhost:3003/api/board/invite' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "tientd",
        "idBoard": "60a93b79ab6ecb4e0cade7e9"
    }'
    
### Response
      {
        "code": 200,
        "message": "Invited Member."
       }
### Trong đó: 
   * username: tài khoản thành viên  
   * idBoard: chỉ mục của bảng được mời
   * headers: Authorization: Bearer {token}
      
## Tạo column

### Body
    {
        "title": "To do"
    }
### Request
    `POST /api/list-editing/:boardId`
    
    curl --location --request POST 'http://localhost:3003/api/list-editing/60a93b79ab6ecb4e0cade7e9' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "To do"
    }'
    
### Response
      {
        "code": 200,
        "message": "Create List Task Success"
    }
### Trong đó: 
   * title: tiêu đề của column
   * boardId: chỉ mục của bảng
   * headers: Authorization: Bearer {token}


## Danh sách column

### Request
    `POST /api/list-editing/:boardId`
    
    curl --location --request GET 'http://localhost:3003/api/list-editing/60a93b79ab6ecb4e0cade7e9' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --data-raw ''
    
### Response
      [
        {
            "list_task": [],
            "_id": "60a9c43ce46c493187549963",
            "title": "To do",
            "idBoard": "60a93b79ab6ecb4e0cade7e9",
            "createdAt": "2021-05-23T02:55:56.160Z",
            "updatedAt": "2021-05-23T02:55:56.160Z",
            "__v": 0
        }
    ]
### Trong đó: 
   * boardId: chỉ mục của bảng
   * headers: Authorization: Bearer {token}
      

## Xoá column

### Body 
    {
        "idBoard": "60a93b79ab6ecb4e0cade7e9"
    }

### Request
    `DELETE /api/list-editing/:id`
    
       curl --location --request DELETE 'http://localhost:3003/api/list-editing/60a9c5b8e46c493187549966' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYThjNzY0YmE3ZDEzNDBhMmY0Y2Q0YiIsImlhdCI6MTYyMTY3NDQ2MywiZXhwIjoxNjI0MjY2NDYzfQ.1IV2hWCq4NmzgqzYIkwSj_rKAi5wAFRqVH0OjJig5QE' \
    --data-raw ''
    
### Response
      {
        "code": 200,
        "message": "Remove Successful"
    }
### Trong đó: 
   * id: chỉ mục của column
   * idBoard: chỉ mục board chứa nó
   * headers: Authorization: Bearer {token}
      
## Cập nhật column

### Body
    {
        "title": "Process updated"
    }

### Request
    `PUT /api/list-editing/:id`
    
       curl --location --request PUT 'http://localhost:3003/api/list-editing/60a9c96683809d358190a7d1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "Process updated"
    }'
    
### Response
      {
        "list_task": [],
        "_id": "60a9c96683809d358190a7d1",
        "title": "Process updated",
        "idBoard": "60a93b79ab6ecb4e0cade7e9",
        "createdAt": "2021-05-23T03:17:58.475Z",
        "updatedAt": "2021-05-23T03:18:58.561Z",
        "__v": 0
    }
### Trong đó: 
   * id: chỉ mục của column
   * title: tiêu đề mới cần sửa
   * headers: Authorization: Bearer {token}

## Sao chép column

### Body
    {
        "idBoard": "60a93b79ab6ecb4e0cade7e9"
    }

### Request
    `POST /api/list-editing/copy/:id`
    
     curl --location --request POST 'http://localhost:3003/api/list-editing/copy/60a9c96683809d358190a7d1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTkzOWM1YWI2ZWNiNGUwY2FkZTdlNyIsImlhdCI6MTYyMTcwMzE4NiwiZXhwIjoxNjI0Mjk1MTg2fQ.uOb3IFlEEExlLJTxzNpbIy8NIuClzheeAaytx3oMOWI' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "idBoard": "60a93b79ab6ecb4e0cade7e9"
    }'
    
### Response
      {
        "list_task": [],
        "_id": "60a9c96683809d358190a7d1",
        "title": "Process updated",
        "idBoard": "60a93b79ab6ecb4e0cade7e9",
        "createdAt": "2021-05-23T03:17:58.475Z",
        "updatedAt": "2021-05-23T03:18:58.561Z",
        "__v": 0
    }
### Trong đó: 
   * id: chỉ mục của column
   * idBoard: chỉ mục của bảng 
   * title: tiêu đề mới cần sửa
   * headers: Authorization: Bearer {token}
     
      
      
      
      
      
      
      
      
      
      
