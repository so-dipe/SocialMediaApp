from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from core.sql_database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey('users.id'))
    author = relationship("User")
    timestamp = Column(DateTime)
    parent = Column(Integer, ForeignKey('posts.id', ondelete='CASCADE'))
    num_likes = Column(Integer)
    num_comments = Column(Integer)
    content = Column(String)


