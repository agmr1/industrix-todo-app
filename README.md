# 🚀 Industrix Todo App - Full Stack Engineer Intern Coding Challenge

## 📋 Project Overview

Welcome to the Industrix Todo App! This is a complete full-stack web application built for the Full Stack Engineer Intern coding challenge. The application provides a robust todo management system with categories, advanced filtering, search functionality, and responsive design.

### 🎯 Features Implemented

#### Core Features ✅
- **✅ Todo Management**: Create, read, update, delete todos with titles and descriptions
- **✅ Completion Toggle**: Mark todos as completed/incomplete with visual indicators
- **✅ Categories System**: Assign categories to todos with color coding
- **✅ Custom Categories**: Full CRUD operations for categories
- **✅ Pagination**: Display 10-20 items per page with intuitive controls
- **✅ Search Functionality**: Search todos by title and description
- **✅ Responsive Design**: Optimized for desktop, tablet, and mobile devices

#### Bonus Features 
- **✅ Backend Unit Tests**  - Comprehensive test coverage
- **✅ React Context API**  - Global state management
- **✅ Advanced Filtering**  - Filter by status, category, priority
- **✅ Docker Containerization**  - Full container setup
- **✅ TypeScript**  - Type-safe frontend development

## 🚀 Step-by-Step Setup Instructions

### Prerequisites
- **Docker and Docker Compose** (Recommended)
- Or **Node.js 18+** and **Python 3.11+** for local development

### Method 1: Docker Setup (Easiest - Recommended for New Team Members)

#### Step 1: Get the Project
```bash
# If you have a zip file, extract it:
unzip industrix-todo-app.zip
cd industrix-todo-app

# Or if using Git:
git clone <repository-url>
cd industrix-todo-app
```

#### Step 2: Start the Application
```bash
# This command does everything automatically:
docker-compose up --build
```

#### Step 3: Access the Application
- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

#### Step 4: Verify Everything is Working
1. Open http://localhost:3000 in your browser
2. You should see the Todo App with sample data
3. Try creating a new todo to test the functionality

### Method 2: Manual Setup (Without Docker)

#### Backend Setup

**Step 1: Setup Python Environment**
```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

**Step 2: Install Dependencies**
```bash
pip install -r requirements.txt
```

**Step 3: Setup PostgreSQL Database**
1. Install PostgreSQL on your machine
2. Create a database:
```sql
CREATE DATABASE todo_db;
CREATE USER todo_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;
```

**Step 4: Run Database Migrations**
```bash
psql -d todo_db -f migrations/001_create_tables.up.sql
```

**Step 5: Start Backend Server**
```bash
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```

#### Frontend Setup

**Step 1: Install Dependencies**
```bash
cd frontend
npm install
```

**Step 2: Start Development Server**
```bash
npm run dev
```

**Step 3: Access Application**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### 🛠 Troubleshooting Common Issues

**Port Already in Use:**
```bash
# Check what's using the ports
netstat -ano | findstr :3000
netstat -ano | findstr :8000
netstat -ano | findstr :5432

# Kill the processes if needed
taskkill /PID <process_id> /F
```

**Docker Issues:**
```bash
# If containers won't start:
docker-compose down
docker-compose up --build

# If you need to reset everything:
docker-compose down -v
docker-compose up --build
```

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
python -m pytest tests/ -v

# With coverage report
python -m pytest tests/ --cov=src --cov-report=html
```

### Test Coverage Includes:
- ✅ Todo CRUD operations
- ✅ Category management
- ✅ Pagination and filtering logic
- ✅ Error handling scenarios
- ✅ Database operations

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication
No authentication required for this implementation.

### Todo Endpoints

#### GET /api/todos - List Todos with Pagination and Filters
**Query Parameters:**
- `page` (integer, default: 1) - Page number
- `limit` (integer, default: 10) - Items per page (1-50)
- `search` (string, optional) - Search in title and description
- `completed` (boolean, optional) - Filter by completion status
- `category_id` (integer, optional) - Filter by category
- `priority` (string, optional) - Filter by priority (low/medium/high)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Complete coding challenge",
      "description": "Build a full-stack todo application",
      "completed": false,
      "priority": "high",
      "due_date": "2024-08-03T23:59:59Z",
      "category": {
        "id": 2,
        "name": "Work",
        "color": "#3B82F6"
      },
      "created_at": "2024-07-31T10:00:00Z",
      "updated_at": "2024-07-31T10:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 25,
    "total_pages": 3
  }
}
```

#### POST /api/todos - Create New Todo
**Request Body:**
```json
{
  "title": "New Todo Item",
  "description": "Optional description",
  "priority": "medium",
  "category_id": 1,
  "due_date": "2024-08-05T23:59:59Z"
}
```

**Response:** Returns the created todo object.

#### PUT /api/todos/{id} - Update Todo
**Request Body:** Same as POST
**Response:** Returns the updated todo object.

#### DELETE /api/todos/{id} - Delete Todo
**Response:**
```json
{
  "message": "Todo deleted successfully"
}
```

#### PATCH /api/todos/{id}/complete - Toggle Completion Status
**Response:** Returns the updated todo object.

### Category Endpoints

#### GET /api/categories - List All Categories
**Response:**
```json
[
  {
    "id": 1,
    "name": "Work",
    "color": "#3B82F6",
    "created_at": "2024-07-31T10:00:00Z"
  }
]
```

#### POST /api/categories - Create New Category
**Request Body:**
```json
{
  "name": "Personal",
  "color": "#10B981"
}
```

#### PUT /api/categories/{id} - Update Category
**Request Body:** Same as POST
**Response:** Returns the updated category object.

#### DELETE /api/categories/{id} - Delete Category
**Response:**
```json
{
  "message": "Category deleted successfully"
}
```

### Error Responses
All endpoints return standardized error responses:

```json
{
  "detail": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## 💡 Technical Questions & Answers

### Database Design Questions

#### 1. What database tables did you create and why?

**Tables Created:**
1. **`categories` table**: Stores todo categories
2. **`todos` table**: Stores individual todo items

**Table Details:**

**Categories Table:**
```sql
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    color VARCHAR(7) NOT NULL DEFAULT '#3B82F6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
- **Purpose**: To categorize todos and allow color-coding
- **Why**: Separates category management from todos, enabling reuse and independent management

**Todos Table:**
```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE,
    category_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
- **Purpose**: Core table storing all todo items with their properties
- **Why**: Centralized storage for all todo-related data with proper relationships

**Relationships:**
- **One-to-Many**: One category can have many todos (`categories.id` → `todos.category_id`)
- **Foreign Key Constraint**: Ensures data integrity

**Why This Structure?**
- **Normalization**: Separates concerns, reduces data redundancy
- **Flexibility**: Easy to add new categories without modifying todo structure
- **Performance**: Efficient queries with proper indexing
- **Maintainability**: Clear separation of category and todo logic

#### 2. How did you handle pagination and filtering in the database?

**Pagination Implementation:**
```python
def get_todos(db: Session, page: int = 1, limit: int = 10, ...):
    offset = (page - 1) * limit
    query = db.query(models.Todo)
    
    # Apply filters
    if search:
        query = query.filter(or_(
            models.Todo.title.ilike(f"%{search}%"),
            models.Todo.description.ilike(f"%{search}%")
        ))
    
    if completed is not None:
        query = query.filter(models.Todo.completed == completed)
    
    # Get total count before pagination
    total = query.count()
    
    # Apply pagination
    todos = query.offset(offset).limit(limit).all()
    
    return todos, total
```

**Filtering Queries:**
- **Search**: `ILIKE` queries on title and description for case-insensitive search
- **Status**: Boolean equality check on completed field
- **Category**: Foreign key equality check
- **Priority**: Enum value equality check

**Efficient Pagination:**
- **OFFSET/LIMIT**: Standard SQL pagination pattern
- **Count Before Pagination**: Get total count for UI pagination controls
- **Database-Level Filtering**: All filtering happens in database for performance

**Indexes Added:**
```sql
CREATE INDEX idx_todos_title ON todos(title);
CREATE INDEX idx_todos_completed ON todos(completed);
CREATE INDEX idx_todos_priority ON todos(priority);
CREATE INDEX idx_todos_category_id ON todos(category_id);
CREATE INDEX idx_categories_name ON categories(name);
```

**Why These Indexes?**
- **`idx_todos_title`**: Optimizes search functionality
- **`idx_todos_completed`**: Speeds up status filtering (very common operation)
- **`idx_todos_priority`**: Accelerates priority-based queries
- **`idx_todos_category_id`**: Improves category joins and filtering
- **`idx_categories_name`**: Faster category lookups and uniqueness checks

### Technical Decision Questions

#### 1. How did you implement responsive design?

**Breakpoints Strategy:**
- **xs** (<576px): Mobile devices - single column layout
- **sm** (≥576px): Tablets - two column filters
- **md** (≥768px): Small desktops - multi-column layout
- **lg** (≥992px): Large desktops - full horizontal layout

**UI Adaptation:**
- **Mobile**: Stacked layout, larger touch targets, simplified navigation
- **Tablet**: Two-column filter arrangement, optimized card sizes
- **Desktop**: Multi-column horizontal layout with ample spacing

**Ant Design Components for Responsiveness:**
- **`Row` and `Col`**: Grid system with responsive span props
- **`Card`**: Adaptive padding and margins
- **`Space`**: Flexible spacing that adjusts to container size
- **`Modal`**: Responsive widths and positioning
- **`Select` and `Input`**: Size variants for different screens

**Example Implementation:**
```tsx
<Row gutter={[16, 16]} align="middle">
  <Col xs={24} sm={12} md={6}>
    <Search placeholder="Search todos..." style={{ width: '100%' }} />
  </Col>
  <Col xs={12} sm={6} md={4}>
    <Select placeholder="Status" style={{ width: '100%' }} />
  </Col>
</Row>
```

#### 2. How did you structure your React components?

**Component Hierarchy:**
```
App (Root Component)
├── TodoProvider (Context Provider)
├── Layout
│   ├── Header (App title + New Todo button)
│   └── Content (Main content area)
│       ├── FilterBar (Search and filters)
│       ├── TodoList (List of todos)
│       │   └── TodoCard (Individual todo item)
│       └── Pagination (Page controls)
└── TodoForm (Modal for create/edit)
```

**State Management:**
- **React Context API**: Global state for todos, categories, pagination, filters
- **Local State**: Component-specific state (modal visibility, form data)
- **Props**: Data flow from parent to child components

**Filtering and Pagination State:**
```typescript
interface Filters {
  search: string;
  completed: boolean | null;
  category_id: number | null;
  priority: string | null;
}

interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
```

**State Flow:**
1. Filters changed in UI → Update context state
2. Context state changes → Trigger API call with new filters
3. API response → Update todos and pagination state
4. State updates → Re-render components with new data

#### 3. What backend architecture did you choose and why?

**Architecture Choice: FastAPI + SQLAlchemy**
- **FastAPI**: Modern, fast, with automatic OpenAPI documentation
- **SQLAlchemy**: Mature ORM with excellent PostgreSQL support
- **Pydantic**: Runtime data validation using Python type hints

**API Route Organization:**
```python
# In main.py
@app.get("/api/todos/", response_model=schemas.TodoListResponse)
def read_todos(...): ...

@app.post("/api/todos/", response_model=schemas.Todo)
def create_todo(...): ...

@app.get("/api/categories/", response_model=List[schemas.Category])
def read_categories(...): ...
```

**Code Structure:**
- **`models.py`**: SQLAlchemy ORM models (database schema)
- **`schemas.py`**: Pydantic models (request/response validation)
- **`crud.py`**: Database operations (create, read, update, delete)
- **`main.py`**: API routes and application setup
- **`database.py`**: Database connection and session management

**Error Handling Approach:**
- **HTTP Exceptions**: Proper status codes (404, 400, 500)
- **Validation Errors**: Automatic validation with Pydantic
- **Database Errors**: SQLAlchemy exception handling
- **Consistent Responses**: Standardized error format

```python
@app.get("/api/todos/{todo_id}")
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo
```

#### 4. How did you handle data validation?

**Multi-layer Validation Strategy:**

**1. Frontend Validation (Ant Design Forms):**
```tsx
<Form.Item
  name="title"
  label="Title"
  rules={[{ required: true, message: 'Please enter todo title' }]}
>
  <Input placeholder="Enter todo title" />
</Form.Item>
```

**2. Backend Validation (Pydantic Schemas):**
```python
class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: PriorityEnum = PriorityEnum.medium
    due_date: Optional[datetime] = None
    category_id: Optional[int] = None

    @validator('title')
    def title_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Title cannot be empty')
        return v
```

**3. Database Validation (SQL Constraints):**
```sql
priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high'))
```

**Validation Rules Implemented:**
- **Required Fields**: Title (todo), name (category)
- **String Length**: Title max 200 chars, category name max 100 chars
- **Color Format**: Hex color validation (#RRGGBB)
- **Priority Values**: Enum validation (low/medium/high)
- **Date Format**: ISO 8601 datetime validation

**Why This Approach?**
- **Defense in Depth**: Multiple validation layers
- **User Experience**: Immediate feedback from frontend validation
- **Data Integrity**: Backend ensures data consistency
- **Security**: Prevents invalid data from reaching database

### Testing & Quality Questions

#### 1. What did you choose to unit test and why?

**Tested Components:**
- **CRUD Operations**: Create, read, update, delete for todos and categories
- **Pagination Logic**: Page calculation and offset handling
- **Filtering Logic**: Search, status, category, and priority filters
- **Database Operations**: Connection handling and query execution

**Functions/Methods with Tests:**
```python
def test_create_todo(db): ...
def test_get_todos_with_pagination(db): ...
def test_search_todos(db): ...
def test_toggle_todo_completion(db): ...
def test_create_category(db): ...
```

**Edge Cases Considered:**
- Empty search results
- Invalid category references
- Pagination beyond available pages
- Toggle completion on non-existent todos
- Database connection failures
- Invalid priority values

**Test Structure:**
```python
@pytest.fixture(scope="function")
def db():
    # Setup test database
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    yield db
    # Teardown
    Base.metadata.drop_all(bind=engine)

def test_create_todo(db):
    # Arrange
    category = create_test_category(db)
    todo_data = TodoCreate(title="Test", category_id=category.id)
    
    # Act
    todo = create_todo(db, todo_data)
    
    # Assert
    assert todo.title == "Test"
    assert todo.completed == False
```

#### 2. If you had more time, what would you improve or add?

**Technical Debt to Address:**
- **Error Boundaries**: Add React error boundaries for better error handling
- **Loading States**: More granular loading indicators
- **Request Retry Logic**: Exponential backoff for failed API calls
- **Database Connection Pooling**: For better performance under load
- **Structured Logging**: Better logging with correlation IDs

**Features to Add:**
- **User Authentication**: JWT-based auth with user-specific todos
- **Real-time Updates**: WebSocket support for live collaboration
- **File Attachments**: Upload and attach files to todos
- **Calendar Integration**: Drag-and-drop scheduling
- **Export Functionality**: PDF/CSV export of todos
- **Advanced Search**: Full-text search with highlighting
- **Todo Templates**: Reusable todo templates
- **Recurring Todos**: Repeat patterns for recurring tasks

**Refactoring Opportunities:**
- **Custom Hooks**: Extract reusable logic into custom React hooks
- **Component Composition**: More granular component breakdown
- **API Client**: Dedicated API client with interceptors
- **Configuration Management**: Environment-based configuration
- **End-to-End Testing**: Add Cypress tests for critical user flows
- **API Versioning**: Proper API versioning strategy
- **Rate Limiting**: API rate limiting and throttling

**Performance Optimizations:**
- **Frontend Code Splitting**: Lazy loading for better initial load
- **Database Query Optimization**: More advanced indexing strategies
- **Caching Layer**: Redis caching for frequently accessed data
- **CDN Integration**: For static assets delivery

## 🎯 Conclusion


The application is production-ready with proper error handling, responsive design, comprehensive testing, and excellent documentation. The architecture choices ensure maintainability, scalability, and a great developer experience.
