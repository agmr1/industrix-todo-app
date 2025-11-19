import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Todo, Category, TodoCreate, TodoUpdate, CategoryCreate, CategoryUpdate } from '../types';

interface TodoContextType {
  todos: Todo[];
  categories: Category[];
  loading: boolean;
  pagination: Pagination;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  fetchTodos: (page?: number, limit?: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createTodo: (todo: TodoCreate) => Promise<void>;
  updateTodo: (id: number, todo: TodoUpdate) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  createCategory: (category: CategoryCreate) => Promise<void>;
  updateCategory: (id: number, category: CategoryUpdate) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface Filters {
  search: string;
  completed: boolean | null;
  category_id: number | null;
  priority: string | null;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1
  });
  const [filters, setFilters] = useState<Filters>({
    search: '',
    completed: null,
    category_id: null,
    priority: null
  });

  const API_BASE = 'http://localhost:8000/api';

  const fetchTodos = async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.completed !== null && { completed: filters.completed.toString() }),
        ...(filters.category_id && { category_id: filters.category_id.toString() }),
        ...(filters.priority && { priority: filters.priority })
      });

      const response = await fetch(`${API_BASE}/todos?${params}`);
      const data = await response.json();
      
      setTodos(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const createTodo = async (todo: TodoCreate) => {
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      });
      await response.json();
      await fetchTodos(pagination.current_page, pagination.per_page);
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  };

  const updateTodo = async (id: number, todo: TodoUpdate) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      });
      await response.json();
      await fetchTodos(pagination.current_page, pagination.per_page);
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
      await fetchTodos(pagination.current_page, pagination.per_page);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}/complete`, {
        method: 'PATCH'
      });
      await response.json();
      await fetchTodos(pagination.current_page, pagination.per_page);
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw error;
    }
  };

  const createCategory = async (category: CategoryCreate) => {
    try {
      const response = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });
      await response.json();
      await fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  };

  const updateCategory = async (id: number, category: CategoryUpdate) => {
    try {
      const response = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });
      await response.json();
      await fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' });
      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  const value: TodoContextType = {
    todos,
    categories,
    loading,
    pagination,
    filters,
    setFilters,
    fetchTodos,
    fetchCategories,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    createCategory,
    updateCategory,
    deleteCategory
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};