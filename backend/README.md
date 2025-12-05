# Volunteer Habit Tracker - Backend

FastAPI backend for tracking volunteer hours, calculating points, and managing badges.

## Features

- User authentication (register/login with JWT)
- Volunteer event tracking (CRUD operations)
- Automatic points calculation based on hours and volunteer type
- Badge system (Novice, Professional, Elite, etc.)
- Leaderboard to compare with other volunteers
- Detailed user statistics

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

4. Run the development server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Events
- `POST /api/events` - Create volunteer event
- `GET /api/events` - Get all user's events
- `GET /api/events/{id}` - Get specific event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

### Users
- `GET /api/users/me` - Get current user profile
- `GET /api/users/me/stats` - Get detailed statistics
- `GET /api/users/leaderboard` - Get top volunteers
- `GET /api/users/{id}` - Get user by ID

## Points System

Base: 10 points per hour

Multipliers by type:
- Healthcare: 1.5x
- Tutoring: 1.3x
- Environmental: 1.2x
- Other types: 1.0x

## Badges

- Novice Volunteer: 10+ hours
- Dedicated Volunteer: 50+ hours
- Professional Volunteer: 100+ hours
- Elite Volunteer: 250+ hours
- Point Master: 500+ points
- Point Legend: 1000+ points
- Community Hero: 500+ hours

## Tech Stack

- FastAPI - Web framework
- Motor - Async MongoDB driver
- Pydantic - Data validation
- Python-JOSE - JWT tokens
- Passlib - Password hashing
