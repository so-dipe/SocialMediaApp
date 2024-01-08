import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    #MongoDB
    MONGODB_USER = os.getenv("MONGODB_USERNAME")
    MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")
    MONGODB_URL=f"mongodb+srv://{MONGODB_USER}:{MONGODB_PASSWORD}@social-media-app.upii90x.mongodb.net/?retryWrites=true&w=majority"

    SECRET=os.getenv("SECRET")

    SERVICE_ACCOUNT_KEY_PATH = os.getenv("SERVICE_ACCOUNT_KEY_PATH")

    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS")
    
    # PostgreSQL
    # POSTGRESQL_USERNAME = os.getenv("POSTGRESQL_USERNAME")
    # POSTGRESQL_PASSWORD = os.getenv("POSTGRESQL_PASSWORD")
    # POSTGRESQL_DBNAME = os.getenv("POSTGRESQL_USERNAME")
    # SQL_DATABASE_URL=f"postgresql+psycopg://{POSTGRESQL_USERNAME}:{POSTGRESQL_PASSWORD}@mahmud.db.elephantsql.com/{POSTGRESQL_DBNAME}"