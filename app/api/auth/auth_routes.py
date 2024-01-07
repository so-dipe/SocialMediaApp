from fastapi import APIRouter, Depends, HTTPException, status, Body
from core.mongo import users_collection
from ..auth.tokens import generate_token, verify_password, hash_password
from datetime import datetime
from pydantic import BaseModel, Field

router = APIRouter()

class User(BaseModel):
    username: str = Field(..., pattern="^[A-Za-z0-9-_]+$")
    password: str = Field(..., pattern="^[^\s]+$")

@router.post("/signup")
async def signup(user: User = Body(...)):
    username = user.username
    password = user.password
    user = await users_collection.find_one({"username": username})
    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
    else:
        # Hash the password before storing it in the database
        hashed_password = hash_password(password)
        user_data = {
            "username": username,
            "password": hashed_password,
            "created": datetime.utcnow()
        }
        result = await users_collection.insert_one(user_data)
        
        # Generate and return JWT token
        token = generate_token(str(result.inserted_id))
        return {"token": token}

@router.post("/login")
async def login(user: User = Body(...)):
    username = user.username
    password = user.password
    user = await users_collection.find_one({"username": username})
    if user and verify_password(password, user["password"]):
        # Password verification successful, generate and return JWT token
        token = generate_token(str(user["_id"]))
        return {
            "token": token,
            "username": username,
            "id": str(user["_id"])
        }
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
