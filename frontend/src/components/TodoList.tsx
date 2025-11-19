import React from 'react';
import { List, Card, Tag, Button, Space, Typography, Empty } from 'antd';
import { CheckOutlined, EditOutlined, DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Todo } from '../types';
import { useTodo } from '../contexts/TodoContext';

const { Text, Title } = Typography;

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onEdit }) => {
  const { todos, loading, toggleTodo, deleteTodo } = useTodo();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (todos.length === 0 && !loading) {
    return (
      <Empty 
        description="No todos found" 
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <List
      loading={loading}
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item>
          <Card 
            style={{ 
              width: '100%',
              opacity: todo.completed ? 0.7 : 1
            }}
            actions={[
              <Button 
                type="text" 
                icon={<CheckOutlined />}
                onClick={() => toggleTodo(todo.id)}
                style={{ color: todo.completed ? '#52c41a' : '#d9d9d9' }}
              />,
              <Button 
                type="text" 
                icon={<EditOutlined />}
                onClick={() => onEdit(todo)}
              />,
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />}
                onClick={() => deleteTodo(todo.id)}
              />
            ]}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space align="start" style={{ width: '100%', justifyContent: 'space-between' }}>
                <Title 
                  level={4} 
                  style={{ 
                    margin: 0,
                    textDecoration: todo.completed ? 'line-through' : 'none'
                  }}
                >
                  {todo.title}
                </Title>
                <Space>
                  <Tag color={getPriorityColor(todo.priority)}>
                    {todo.priority.toUpperCase()}
                  </Tag>
                  {todo.completed && <Tag color="green">Completed</Tag>}
                </Space>
              </Space>

              {todo.description && (
                <Text type="secondary">{todo.description}</Text>
              )}

              <Space wrap>
                {todo.category && (
                  <Tag color={todo.category.color}>
                    {todo.category.name}
                  </Tag>
                )}
                
                {todo.due_date && (
                  <Tag icon={<ClockCircleOutlined />} color="blue">
                    Due: {formatDate(todo.due_date)}
                  </Tag>
                )}
                
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Created: {formatDate(todo.created_at)}
                </Text>
              </Space>
            </Space>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default TodoList;