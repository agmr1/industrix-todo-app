import React from 'react';
import { Card, Input, Select, Button, Space, Row, Col } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { useTodo } from '../contexts/TodoContext';

const { Option } = Select;
const { Search } = Input;

const FilterBar: React.FC = () => {
  const { filters, setFilters, categories, fetchTodos, pagination } = useTodo();

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    fetchTodos(1, pagination.per_page);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchTodos(1, pagination.per_page);
  };

  const clearFilters = () => {
    const newFilters = {
      search: '',
      completed: null,
      category_id: null,
      priority: null
    };
    setFilters(newFilters);
    fetchTodos(1, pagination.per_page);
  };

  const hasActiveFilters = filters.search || filters.completed !== null || 
                          filters.category_id !== null || filters.priority !== null;

  return (
    <Card size="small" style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={6}>
          <Search
            placeholder="Search todos..."
            allowClear
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            style={{ width: '100%' }}
          />
        </Col>
        
        <Col xs={12} sm={6} md={4}>
          <Select
            placeholder="Status"
            value={filters.completed}
            onChange={(value) => handleFilterChange('completed', value)}
            style={{ width: '100%' }}
            allowClear
          >
            <Option value={false}>Active</Option>
            <Option value={true}>Completed</Option>
          </Select>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Select
            placeholder="Priority"
            value={filters.priority}
            onChange={(value) => handleFilterChange('priority', value)}
            style={{ width: '100%' }}
            allowClear
          >
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Select
            placeholder="Category"
            value={filters.category_id}
            onChange={(value) => handleFilterChange('category_id', value)}
            style={{ width: '100%' }}
            allowClear
          >
            {categories.map(category => (
              <Option key={category.id} value={category.id}>
                <Space>
                  <div 
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: category.color,
                      borderRadius: '50%'
                    }}
                  />
                  {category.name}
                </Space>
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={12} sm={6} md={6}>
          <Space>
            <Button 
              icon={<FilterOutlined />}
              onClick={() => fetchTodos(1, pagination.per_page)}
            >
              Apply
            </Button>
            
            {hasActiveFilters && (
              <Button 
                icon={<ClearOutlined />}
                onClick={clearFilters}
                danger
              >
                Clear
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterBar;