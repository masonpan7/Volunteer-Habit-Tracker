from fastapi import APIRouter, HTTPException, Depends # type: ignore
from typing import List
from bson import ObjectId # type: ignore
from models import User
from database import get_database
from dependencies import get_current_user

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("/me", response_model=User)
async def get_current_user_profile(current_user: dict = Depends(get_current_user)):
    """Get current user's profile"""
    return User(**current_user)

@router.get("/me/stats")
async def get_user_stats(
    current_user: dict = Depends(get_current_user),
    db=Depends(get_database)
):
    """Get current user's statistics"""
    events_collection = db["events"]
    
    # Get event breakdown by type
    events_by_type = {}
    async for event in events_collection.find({"user_id": current_user["_id"]}):
        event_type = event["type"]
        if event_type not in events_by_type:
            events_by_type[event_type] = {"count": 0, "hours": 0, "points": 0}
        events_by_type[event_type]["count"] += 1
        events_by_type[event_type]["hours"] += event["hours"]
        events_by_type[event_type]["points"] += event["points"]
    
    return {
        "username": current_user["username"],
        "total_hours": current_user["total_hours"],
        "total_points": current_user["total_points"],
        "badges": current_user["badges"],
        "events_by_type": events_by_type,
        "total_events": sum(data["count"] for data in events_by_type.values())
    }

@router.get("/leaderboard")
async def get_leaderboard(
    db=Depends(get_database), 
    limit: int = 10,
    current_user: dict = Depends(get_current_user)
):
    """Get leaderboard of top volunteers by points"""
    users_collection = db["users"]
    
    leaderboard = []
    rank = 1
    async for user in users_collection.find().sort("total_points", -1).limit(limit):
        leaderboard.append({
            "rank": rank,
            "username": user["username"],
            "totalHours": user["total_hours"],  # Match frontend camelCase
            "totalPoints": user["total_points"],  # Match frontend camelCase
            "badges": user["badges"],
            "isCurrentUser": str(user["_id"]) == current_user["_id"]
        })
        rank += 1
    
    return leaderboard

@router.get("/{user_id}", response_model=User)
async def get_user_by_id(user_id: str, db=Depends(get_database)):
    """Get user profile by ID"""
    users_collection = db["users"]
    
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["_id"] = str(user["_id"])
    return User(**user)
