from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: str = Field(alias="_id")
    total_hours: float = 0.0
    total_points: int = 0
    badges: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class VolunteerType(str, Enum):
    COMMUNITY_SERVICE = "Community Service"
    TUTORING = "Tutoring"
    ENVIRONMENTAL = "Environmental"
    HEALTHCARE = "Healthcare"
    ANIMAL_CARE = "Animal Care"
    FUNDRAISING = "Fundraising"
    OTHER = "Other"

class VolunteerEventCreate(BaseModel):
    organization: str
    hours: float
    type: VolunteerType
    date: datetime
    description: Optional[str] = None

class VolunteerEventUpdate(BaseModel):
    organization: Optional[str] = None
    hours: Optional[float] = None
    type: Optional[VolunteerType] = None
    date: Optional[datetime] = None
    description: Optional[str] = None

class VolunteerEvent(BaseModel):
    id: str = Field(alias="_id")
    user_id: str
    organization: str
    hours: float
    type: VolunteerType
    date: datetime
    points: int
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
