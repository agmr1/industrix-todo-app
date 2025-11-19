import React from 'react';
import { Pagination as AntPagination, Select, Space, Typography } from 'antd';
import { useTodo } from '../contexts/TodoContext';

const { Text } = Typography;
const { Option } = Select;

const Pagination: React.FC = () => {
  const { pagination, fetchTodos } = useTodo();

  const handlePageChange = (page: number, pageSize?: number) => {
    fetchTodos(page, pageSize || pagination.per_page);
  };

  const handlePageSizeChange = (size: number) => {
    fetchTodos(1, size);
  };

  if (pagination.total === 0) {
    return null;
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginTop: 16,
      flexWrap: 'wrap',
      gap: 16
    }}>
      <Space>
        <Text type="secondary">
          Showing {(pagination.current_page - 1) * pagination.per_page + 1} to{' '}
          {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{' '}
          {pagination.total} items
        </Text>
        
        <Space>
          <Text type="secondary">Items per page:</Text>
          <Select
            value={pagination.per_page}
            onChange={handlePageSizeChange}
            style={{ width: 80 }}
          >
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
        </Space>
      </Space>

      <AntPagination
        current={pagination.current_page}
        total={pagination.total}
        pageSize={pagination.per_page}
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper
        showTotal={(total, range) => 
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </div>
  );
};

export default Pagination;