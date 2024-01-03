from fastapi import APIRouter, HTTPException
from core.mongo import posts_collection
from bson import ObjectId 
from datetime import datetime

router = APIRouter()

@router.post("/create")
async def create_post(post_data: dict):
    content = post_data.get("content")
    author_id = post_data.get("author_id")
    parent_id = post_data.get("parent_id")
    timestamp = datetime.utcnow()

    if not content or not author_id:
        raise HTTPException(status_code=400, detail="Content and author_id are required")

    post_data = {
        "content": content,
        "author_id": ObjectId(author_id),
        "timestamp": timestamp,
        "likes": []
    }

    if parent_id:
        if ObjectId.is_valid(parent_id):
            post_data["parent"] = ObjectId(parent_id)
        else:
            raise HTTPException(status_code=400, detail="Invalid parent post ID")
            
    try:
        result = await posts_collection.insert_one(post_data)
        return {"message": "Post created successfully", "post_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create post: {str(e)}")

@router.get("/{post_id}")
async def get_post(post_id: str):
    try:
        obj_id = ObjectId(post_id)
        
        post = await posts_collection.find_one({"_id": obj_id})

        if post:
            post["_id"] = str(post["_id"])

            if "parent_id" in post and post["parent_id"]:
                post["parent_id"] = str(post["parent_id"])

            post["author_id"] = str(post["author_id"])

            return post
        else:
            raise HTTPException(status_code=404, detail="Post not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch post: {str(e)}")

@router.post("/{post_id}/like")
async def like_post(post_id: str, user_id: str):
    try:
        obj_id = ObjectId(post_id)
        user_id = ObjectId(user_id)

        post = await posts_collection.find_one({"_id": obj_id})

        if not post:
            raise HTTPException(status_code=404, detail="Post not found")

        if user_id in post.get("likes", []):
            raise HTTPException(status_code=400, detail="you already liked the post")

        await posts_collection.update_one({"_id": obj_id}, {"$push": {"likes": user_id}})

        return {"message": "You've liked this post"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to like post: {str(e)}")

@router.get("/{post_id}/comments")
async def get_comments(post_id: str):
    try:
        obj_id = ObjectId(post_id)

        comments = await posts_collection.find({"parent_id": obj_id}).to_list(length=None)

        if comments:
            for comment in comments:
                comment["_id"] = str(comment["_id"])
                comment["parent_id"] = str(comment["parent_id"])
            return comments
        else:
            raise HTTPException(status_code=404, detail="Comments not found for this post")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch comments: {str(e)}")