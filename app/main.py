from fastapi import FastAPI

from api.users import routes as user_routes
from api.posts import routes as post_routes

app = FastAPI()

app.include_router(user_routes.router, prefix="/api/v1/users")
app.include_router(post_routes.router, prefix="/api/v1/posts")