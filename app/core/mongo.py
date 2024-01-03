from motor.motor_asyncio import AsyncIOMotorClient

from .config import Config

MONGODB_URL = Config.MONGODB_URL

client = AsyncIOMotorClient(MONGODB_URL)

db = client["socials"]

posts_collection = db["posts"]
users_collection = db["users"]