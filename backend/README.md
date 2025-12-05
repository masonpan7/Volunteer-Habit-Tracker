# Volunteer Habit Tracker - Backend

FastAPI backend for tracking volunteer hours, calculating points, and managing badges.

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

## Tech Stack

- FastAPI - Web framework
- Motor - Async MongoDB driver
- Pydantic - Data validation
- Python-JOSE - JWT tokens
- Passlib - Password hashing
