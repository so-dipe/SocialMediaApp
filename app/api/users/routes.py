from fastapi import APIRouter, HTTPException
from core.mongo import users_collection  # Assuming you have a MongoDB collection for users

router = APIRouter()

@router.post("/create")
async def create_user(username: str, email: str):
    try:
        user_data = {
            "username": username,
            "email": email,
        }

        result = await users_collection.insert_one(user_data)
        created_user = await users_collection.find_one({"_id": result.inserted_id})
        created_user['_id'] = str(created_user['_id']) 
        return created_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")
