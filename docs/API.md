# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

### Register
**POST** `/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token"
}
```

### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token"
}
```

## Chat

### Send Message
**POST** `/agent/chat`

Request:
```json
{
  "message": "Hello, agent!",
  "conversationId": "optional_conversation_id"
}
```

Response:
```json
{
  "message": {
    "role": "agent",
    "content": "Agent response",
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "conversationId": "conversation_id"
}
```

### Get Conversations
**GET** `/agent/conversations`

Headers:
```
Authorization: Bearer {token}
```

Response:
```json
[
  {
    "id": "conversation_id",
    "title": "New Chat",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Messages
**GET** `/agent/conversations/:id`

Headers:
```
Authorization: Bearer {token}
```

Response:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello",
      "timestamp": "2024-01-01T00:00:00.000Z"
    },
    {
      "role": "agent",
      "content": "Hi there!",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## User

### Get Profile
**GET** `/user/profile`

Headers:
```
Authorization: Bearer {token}
```

Response:
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

### Update Profile
**PUT** `/user/profile`

Headers:
```
Authorization: Bearer {token}
```

Request:
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

## Admin

### Get Stats
**GET** `/admin/stats`

Headers:
```
Authorization: Bearer {token}
```

Response:
```json
{
  "users": 10,
  "conversations": 50,
  "messages": 200
}
```

### Get All Users
**GET** `/admin/users`

Headers:
```
Authorization: Bearer {token}
```

Response:
```json
[
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```
