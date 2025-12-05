# API Usage Examples

## Authentication

### Register
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Login
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## Events

### Create Event
```bash
curl -X POST "http://localhost:8000/api/events" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "organization": "Local Food Bank",
    "hours": 5.0,
    "type": "Community Service",
    "date": "2024-12-01T10:00:00",
    "description": "Helped sort and pack food donations"
  }'
```

### Get All Events
```bash
curl -X GET "http://localhost:8000/api/events" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Event
```bash
curl -X PUT "http://localhost:8000/api/events/EVENT_ID" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "hours": 6.0
  }'
```

### Delete Event
```bash
curl -X DELETE "http://localhost:8000/api/events/EVENT_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Users

### Get Current User Profile
```bash
curl -X GET "http://localhost:8000/api/users/me" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get User Stats
```bash
curl -X GET "http://localhost:8000/api/users/me/stats" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Leaderboard
```bash
curl -X GET "http://localhost:8000/api/users/leaderboard?limit=10"
```

## Volunteer Types

Available types:
- Community Service
- Tutoring
- Environmental
- Healthcare
- Animal Care
- Fundraising
- Other
