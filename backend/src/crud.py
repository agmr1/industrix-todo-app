from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import List, Tuple, Optional
from . import models, schemas

# Category CRUD operations
def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def get_categories(db: Session):
    return db.query(models.Category).all()

def get_category(db: Session, category_id: int):
    return db.query(models.Category).filter(models.Category.id == category_id).first()

def update_category(db: Session, category_id: int, category: schemas.CategoryUpdate):
    db_category = get_category(db, category_id)
    if db_category:
        for key, value in category.dict().items():
            setattr(db_category, key, value)
        db.commit()
        db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: int):
    db_category = get_category(db, category_id)
    if db_category:
        db.delete(db_category)
        db.commit()
        return True
    return False

# Todo CRUD operations
def create_todo(db: Session, todo: schemas.TodoCreate):
    db_todo = models.Todo(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todos(
    db: Session, 
    page: int = 1, 
    limit: int = 10, 
    search: Optional[str] = None,
    completed: Optional[bool] = None,
    category_id: Optional[int] = None,
    priority: Optional[str] = None
) -> Tuple[List[models.Todo], int]:
    
    query = db.query(models.Todo)
    
    # Apply filters
    if search:
        query = query.filter(or_(
            models.Todo.title.ilike(f"%{search}%"),
            models.Todo.description.ilike(f"%{search}%")
        ))
    
    if completed is not None:
        query = query.filter(models.Todo.completed == completed)
    
    if category_id is not None:
        query = query.filter(models.Todo.category_id == category_id)
    
    if priority:
        query = query.filter(models.Todo.priority == priority)
    
    # Get total count before pagination
    total = query.count()
    
    # Apply pagination
    offset = (page - 1) * limit
    todos = query.offset(offset).limit(limit).all()
    
    return todos, total

def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()

def update_todo(db: Session, todo_id: int, todo: schemas.TodoUpdate):
    db_todo = get_todo(db, todo_id)
    if db_todo:
        update_data = todo.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_todo, key, value)
        db.commit()
        db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, todo_id: int):
    db_todo = get_todo(db, todo_id)
    if db_todo:
        db.delete(db_todo)
        db.commit()
        return True
    return False

def toggle_todo_completion(db: Session, todo_id: int):
    db_todo = get_todo(db, todo_id)
    if db_todo:
        db_todo.completed = not db_todo.completed
        db.commit()
        db.refresh(db_todo)
    return db_todo