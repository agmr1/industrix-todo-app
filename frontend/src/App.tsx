import React, { useEffect, useState } from 'react';
import { 
  Layout, 
  Button, 
  Space, 
  Typography, 
  Row, 
  Col,
  notification 
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTodo } from './contexts/TodoContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';
import { Todo } from './types';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  
  const { fetchTodos, fetchCategories, loading } = useTodo();

  useEffect(() => {
    // Initialize data
    fetchTodos();
    fetchCategories();
  }, []);

  const handleCreateTodo = () => {
    setEditingTodo(null);
    setIsModalVisible(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingTodo(null);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header 
        style={{ 
          background: '#fff', 
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
              🚀 Industrix Todo App
            </Title>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleCreateTodo}
              size="large"
            >
              New Todo
            </Button>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Filter Bar */}
          <FilterBar />

          {/* Todo List */}
          <div style={{ background: '#fff', borderRadius: 8, padding: 24 }}>
            <TodoList onEdit={handleEditTodo} />
          </div>

          {/* Pagination */}
          <Pagination />
        </div>

        {/* Todo Form Modal */}
        <TodoForm
          visible={isModalVisible}
          onCancel={handleModalClose}
          initialValues={editingTodo}
        />
      </Content>
    </Layout>
  );
};

export default App;