from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

class Database:
    client: AsyncIOMotorClient = None
    
db = Database()

async def get_database():
    return db.client[settings.database_name]

async def connect_to_mongo():
    """MongoDB startup"""
    db.client = AsyncIOMotorClient(settings.mongodb_url)

async def close_mongo_connection():
    """MongoDB shutdown"""
    db.client.close()
