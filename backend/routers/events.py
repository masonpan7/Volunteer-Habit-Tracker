from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from bson import ObjectId
from models import VolunteerEvent, VolunteerEventCreate, VolunteerEventUpdate
from database import get_database
from dependencies import get_current_user
from utils import calculate_points, determine_badges

router = APIRouter(prefix="/api/events", tags=["events"])

@router.post("", response_model=VolunteerEvent, status_code=status.HTTP_201_CREATED)
async def create_event(
    event: VolunteerEventCreate,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_database)
):
    """Create a new volunteer event"""
    events_collection = db["events"]
    users_collection = db["users"]
    
    # Calculate points
    points = calculate_points(event.hours, event.type)
    
    # Create event
    event_dict = {
        "user_id": current_user["_id"],
        "organization": event.organization,
        "hours": event.hours,
        "type": event.type,
        "date": event.date,
        "points": points,
        "description": event.description
    }
    
    result = await events_collection.insert_one(event_dict)
    event_dict["_id"] = str(result.inserted_id)
    
    # Update user totals
    new_total_hours = current_user["total_hours"] + event.hours
    new_total_points = current_user["total_points"] + points
    new_badges = determine_badges(new_total_hours, new_total_points)
    
    await users_collection.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {
            "$set": {
                "total_hours": new_total_hours,
                "total_points": new_total_points,
                "badges": new_badges
            }
        }
    )
    
    return VolunteerEvent(**event_dict)

@router.get("", response_model=List[VolunteerEvent])
async def get_events(
    current_user: dict = Depends(get_current_user),
    db=Depends(get_database)
):
    """Get all volunteer events for current user"""
    events_collection = db["events"]
    
    events = []
    async for event in events_collection.find({"user_id": current_user["_id"]}):
        event["_id"] = str(event["_id"])
        events.append(VolunteerEvent(**event))
    
    return events

@router.get("/{event_id}", response_model=VolunteerEvent)
async def get_event(
    event_id: str,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_database)
):
    """Get a specific volunteer event"""
    events_collection = db["events"]
    
    event = await events_collection.find_one({"_id": ObjectId(event_id)})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    if event["user_id"] != current_user["_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to access this event")
    
    event["_id"] = str(event["_id"])
    return VolunteerEvent(**event)

@router.put("/{event_id}", response_model=VolunteerEvent)
async def update_event(
    event_id: str,
    event_update: VolunteerEventUpdate,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_database)
):
    """Update a volunteer event"""
    events_collection = db["events"]
    users_collection = db["users"]
    
    # Get existing event
    event = await events_collection.find_one({"_id": ObjectId(event_id)})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    if event["user_id"] != current_user["_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this event")
    
    # Calculate difference in hours and points
    old_hours = event["hours"]
    old_points = event["points"]
    
    # Update fields
    update_data = event_update.model_dump(exclude_unset=True)
    if update_data:
        # Recalculate points if hours or type changed
        new_hours = update_data.get("hours", event["hours"])
        new_type = update_data.get("type", event["type"])
        new_points = calculate_points(new_hours, new_type)
        update_data["points"] = new_points
        
        await events_collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$set": update_data}
        )
        
        # Update user totals
        hours_diff = new_hours - old_hours
        points_diff = new_points - old_points
        
        new_total_hours = current_user["total_hours"] + hours_diff
        new_total_points = current_user["total_points"] + points_diff
        new_badges = determine_badges(new_total_hours, new_total_points)
        
        await users_collection.update_one(
            {"_id": ObjectId(current_user["_id"])},
            {
                "$set": {
                    "total_hours": new_total_hours,
                    "total_points": new_total_points,
                    "badges": new_badges
                }
            }
        )
    
    # Get updated event
    updated_event = await events_collection.find_one({"_id": ObjectId(event_id)})
    updated_event["_id"] = str(updated_event["_id"])
    return VolunteerEvent(**updated_event)

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(
    event_id: str,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_database)
):
    """Delete a volunteer event"""
    events_collection = db["events"]
    users_collection = db["users"]
    
    # Get event
    event = await events_collection.find_one({"_id": ObjectId(event_id)})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    if event["user_id"] != current_user["_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this event")
    
    # Delete event
    await events_collection.delete_one({"_id": ObjectId(event_id)})
    
    # Update user totals
    new_total_hours = current_user["total_hours"] - event["hours"]
    new_total_points = current_user["total_points"] - event["points"]
    new_badges = determine_badges(new_total_hours, new_total_points)
    
    await users_collection.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {
            "$set": {
                "total_hours": new_total_hours,
                "total_points": new_total_points,
                "badges": new_badges
            }
        }
    )
    
    return None
