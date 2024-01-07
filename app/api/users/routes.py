from fastapi import APIRouter, HTTPException
from core.mongo import users_collection 
from bson import ObjectId

router = APIRouter()

@router.post("/create")
async def create_user(username: str, password: str):
    try:
        user_data = {
            "username": username,
            "password": password,
        }

        result = await users_collection.insert_one(user_data)
        created_user = await users_collection.find_one({"_id": result.inserted_id})
        created_user['_id'] = str(created_user['_id']) 
        created_user['password'] = None
        return created_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

@router.get("/{user_id}")
async def get_user(user_id: str):
    try:
        user = await users_collection.find_one({"_id": ObjectId(user_id)})

        if user:
            user["_id"] = str(user["_id"])
            return user['username']
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch user: {str(e)}")