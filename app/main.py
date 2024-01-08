import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from api.users import routes as user_routes
from api.posts import routes as post_routes
from api.auth import auth_routes 
from core.config import Config

app = FastAPI()

allowed_origins = Config.ALLOWED_ORIGINS.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes.router, prefix="/api/v1/users")
app.include_router(post_routes.router, prefix="/api/v1/posts")
app.include_router(auth_routes.router, prefix="/api/v1/auth")

connected_clients = []
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for client in connected_clients:
                await client.send_text(data)
    except WebSocketDisconnect:
        connected_clients.remove(websocket)
    except Exception as e:
        print(f"Unexpected error: {e}")