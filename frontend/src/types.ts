export interface Category {
  id: number;
  name: string;
  color: string;
  created_at: string;
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  category_id?: number;
  category?: Category;
  created_at: string;
  updated_at: string;
}

export interface TodoCreate {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  category_id?: number;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  due_date?: string;
  category_id?: number;
}

export interface CategoryCreate {
  name: string;
  color: string;
}

export interface CategoryUpdate {
  name?: string;
  color?: string;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}