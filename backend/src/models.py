from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from .database import Base

class PriorityEnum(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True, index=True)
    color = Column(String(7), nullable=False, default="#3B82F6")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    todos = relationship("Todo", back_populates="category")

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text)
    completed = Column(Boolean, default=False, index=True)
    priority = Column(Enum(PriorityEnum), default=PriorityEnum.medium, index=True)
    due_date = Column(DateTime(timezone=True))
    category_id = Column(Integer, ForeignKey("categories.id"), index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    category = relationship("Category", back_populates="todos")