import jwt
import bcrypt
import datetime
from core.config import Config
from fastapi import HTTPException, status

def generate_token(user_id: str) -> str:
    payload = {
        "user_id": user_id,
        "expires": (datetime.datetime.utcnow() + datetime.timedelta(days=7)).isoformat(),
        "audience": "postbook",
        "issuer": "postbook",
        "algorithm": "HS256"
    }

    token = jwt.encode(payload, Config.SECRET, algorithm="HS256")
    return token

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, Config.SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc
    except jwt.InvalidTokenError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

def hash_password(password: str) -> str:
    # Generate a salt and hash the password
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
