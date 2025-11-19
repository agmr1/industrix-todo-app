import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.database import Base
from src import crud, schemas, models

TEST_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
    Base.metadata.drop_all(bind=engine)

def test_create_todo(db):
    # Create a category first
    category = crud.create_category(db, schemas.CategoryCreate(name="Test Category", color="#000000"))
    
    todo_data = schemas.TodoCreate(
        title="Test Todo",
        description="Test Description",
        priority="high",
        category_id=category.id
    )
    
    todo = crud.create_todo(db, todo_data)
    
    assert todo.id is not None
    assert todo.title == "Test Todo"
    assert todo.description == "Test Description"
    assert todo.priority == "high"
    assert todo.category_id == category.id
    assert todo.completed == False

def test_get_todos_with_pagination(db):
    # Create test data
    category = crud.create_category(db, schemas.CategoryCreate(name="Test", color="#000000"))
    
    for i in range(15):
        crud.create_todo(db, schemas.TodoCreate(
            title=f"Todo {i}",
            description=f"Description {i}",
            category_id=category.id
        ))
    
    todos, total = crud.get_todos(db, page=1, limit=10)
    
    assert len(todos) == 10
    assert total == 15

def test_search_todos(db):
    category = crud.create_category(db, schemas.CategoryCreate(name="Test", color="#000000"))
    
    crud.create_todo(db, schemas.TodoCreate(
        title="Buy groceries",
        description="Milk and eggs",
        category_id=category.id
    ))
    
    crud.create_todo(db, schemas.TodoCreate(
        title="Work meeting",
        description="Team sync",
        category_id=category.id
    ))
    
    todos, total = crud.get_todos(db, search="groceries")
    
    assert total == 1
    assert todos[0].title == "Buy groceries"

def test_toggle_todo_completion(db):
    category = crud.create_category(db, schemas.CategoryCreate(name="Test", color="#000000"))
    todo = crud.create_todo(db, schemas.TodoCreate(title="Test", category_id=category.id))
    
    assert todo.completed == False
    
    # Toggle completion
    updated_todo = crud.toggle_todo_completion(db, todo.id)
    assert updated_todo.completed == True
    
    # Toggle back
    updated_todo = crud.toggle_todo_completion(db, todo.id)
    assert updated_todo.completed == False