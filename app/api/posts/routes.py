from fastapi import APIRouter, HTTPException, Query, Depends, Header, Body
from core.mongo import posts_collection
from bson import ObjectId 
from datetime import datetime
import random
from ..users.routes import get_user
from ..auth.tokens import verify_token
from pydantic import BaseModel

class LikeModel(BaseModel):
    user_id: str

router = APIRouter()

async def verify_auth_token(token: str = Depends(verify_token)):
    # If the token verification fails, an exception will be raised by `verify_token`
    # If the control reaches here, the token is valid, and no further action is needed
    pass

@router.post("/create")
async def create_post(post_data: dict, _ = Header(Depends(verify_auth_token))):
    content = post_data.get("content")
    author_id = post_data.get("authorId")
    parent_id = post_data.get("parentId")
    timestamp = datetime.utcnow()

    if not content or not author_id:
        raise HTTPException(status_code=400, detail="Content and author_id are required")

    post_data = {
        "content": content,
        "author_id": ObjectId(author_id),
        "timestamp": timestamp,
        "likes": [],
        "num_likes": 0
    }

    if parent_id:
        print("here")
        if ObjectId.is_valid(parent_id):
            post_data["parent_id"] = ObjectId(parent_id)
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
            author = await get_user(str(post["author_id"]))
            post["author_id"] = str(post["author_id"])
            post["author"] = author
            post["likes"] = None

            if "parent_id" in post and post["parent_id"]:
                post["parent_id"] = str(post["parent_id"])
            return post
        else:
            raise HTTPException(status_code=404, detail="Post not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch post: {str(e)}")

@router.get("/")
async def get_posts(
    method: str = Query(..., description="Retrieval method (top-likes, latest, random)"),
    count: int = Query(10, description="Number of posts to return")
):
    try:
        if method == "top-likes":
            top_liked_posts = await posts_collection.find({"parent_id": None}).sort("likes", -1).limit(count).to_list(length=count)

            for post in top_liked_posts:
                post["_id"] = str(post["_id"])
                author = await get_user(str(post["author_id"]))
                post["author"] = author
                post["author_id"] = str(post["author_id"])
                post["likes"] = None

            return top_liked_posts
        elif method == "latest":
            latest_posts = await posts_collection.find({"parent_id": None}).sort("timestamp", -1).limit(count).to_list(length=count)

            for post in latest_posts:
                post["_id"] = str(post["_id"])
                author = await get_user(str(post["author_id"]))
                post["author"] = author
                post["author_id"] = str(post["author_id"])
                post["likes"] = None
                
            return latest_posts
        elif method == "random":
            all_posts = await posts_collection.find({"parent_id": None}).to_list(length=None)
            random_posts = random.sample(all_posts, min(count, len(all_posts)))

            for post in random_posts:
                post["_id"] = str(post["_id"])
                author = await get_user(str(post["author_id"]))
                post["author"] = author
                post["author_id"] = str(post["author_id"])
                post["likes"] = None

            return random_posts
        else:
            raise HTTPException(status_code=400, detail="Invalid retrieval method")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch posts: {str(e)}")


@router.post("/{post_id}/like")
async def like(post_id: str, like: LikeModel = Body(...)):
    try:
        obj_id = ObjectId(post_id)
        user_id = ObjectId(like.user_id)
        liked = False

        post = await posts_collection.find_one({"_id": obj_id})

        if not post:
            raise HTTPException(status_code=404, detail="Post not found")

        if user_id in post.get("likes", []):
            # User has already liked the post, so unlike it
            await posts_collection.update_one(
                {"_id": obj_id},
                {"$pull": {"likes": user_id}}
            )
            await posts_collection.update_one(
                {"_id": obj_id},
                {"$inc": {"num_likes": -1}}
            )
            liked = False
        else:
            # User has not liked the post, so like it
            await posts_collection.update_one(
                {"_id": obj_id},
                {"$push": {"likes": user_id}}
            )
            await posts_collection.update_one(
                {"_id": obj_id},
                {"$inc": {"num_likes": 1}}
            )
            liked = True

        updated_post = await posts_collection.find_one(
            {"_id": obj_id},
            {"num_likes": 1, "_id": 0}
        )

        return {
            "num_likes": updated_post.get("num_likes"),
            "liked": liked
        }
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=f"Failed to like post: {str(e)}")

@router.get("/{post_id}/comments")
async def get_comments(
    post_id: str,
    method: str = Query("latest", description="Retrieval method (top, latest, all)"),
    count: int = Query(10, description="Number of comments to return")
):
    try:
        obj_id = ObjectId(post_id)

        query = {"parent_id": obj_id}
        sort_by = [("timestamp", -1)]

        if method == "top":
            sort_by = [("likes_count", -1)]

        comments_cursor = posts_collection.find(query).sort(sort_by).limit(count)
        comments = await comments_cursor.to_list(length=None)

        if comments:
            for comment in comments:
                comment["_id"] = str(comment["_id"])
                comment["parent_id"] = str(comment["parent_id"])
                author = await get_user(str(comment["author_id"]))
                comment["author_id"] = str(comment["author_id"])
                comment["author"] = author 
                comment["likes"] = None
            return comments
        else:
            return "No comments yet"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch comments: {str(e)}")

@router.get("/{post_id}/likes")
async def check_like(post_id: str, user_id: str):
    obj_id = ObjectId(post_id)
    user_id = ObjectId(user_id)

    post = await posts_collection.find_one({"_id": obj_id})

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    return {"liked": user_id in post.get("likes", [])}