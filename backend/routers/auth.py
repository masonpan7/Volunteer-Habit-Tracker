from fastapi import APIRouter, HTTPException, status, Depends
from datetime import timedelta
from models import UserCreate, UserLogin, Token, User
from auth import get_password_hash, verify_password, create_access_token
from database import get_database
from config import settings

router = APIRouter(prefix="/api/auth", tags=["authentication"])

@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db=Depends(get_database)):
    """Register a new user"""
    users_collection = db["users"]
    
    # Check if username already exists
    existing_user = await users_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Check if email already exists
    existing_email = await users_collection.find_one({"email": user.email})
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_dict = {
        "username": user.username,
        "email": user.email,
        "password": get_password_hash(user.password),
        "total_hours": 0.0,
        "total_points": 0,
        "badges": []
    }
    
    result = await users_collection.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
    
    return User(**user_dict)

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin, db=Depends(get_database)):
    """Login and get access token"""
    users_collection = db["users"]
    
    # Find user
    user = await users_collection.find_one({"username": user_credentials.username})
    if not user or not verify_password(user_credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
