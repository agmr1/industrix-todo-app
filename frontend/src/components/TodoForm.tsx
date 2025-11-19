import React from 'react';
import { Modal, Form, Input, Select, DatePicker, ColorPicker, Button, Space } from 'antd';
import dayjs from 'dayjs';
import { Todo, TodoCreate, CategoryCreate } from '../types';
import { useTodo } from '../contexts/TodoContext';

const { TextArea } = Input;
const { Option } = Select;

interface TodoFormProps {
  visible: boolean;
  onCancel: () => void;
  initialValues?: Todo | null;
}

interface CategoryFormProps {
  onSuccess: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { createCategory } = useTodo();

  const handleSubmit = async (values: CategoryCreate) => {
    await createCategory(values);
    form.resetFields();
    onSuccess();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Category Name"
        rules={[{ required: true, message: 'Please enter category name' }]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>
      
      <Form.Item
        name="color"
        label="Color"
        initialValue="#3B82F6"
      >
        <ColorPicker format="hex" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Category
        </Button>
      </Form.Item>
    </Form>
  );
};

const TodoForm: React.FC<TodoFormProps> = ({ visible, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  const { createTodo, updateTodo, categories, fetchCategories } = useTodo();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        due_date: initialValues.due_date ? dayjs(initialValues.due_date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: any) => {
    const todoData: TodoCreate | any = {
      ...values,
      due_date: values.due_date ? values.due_date.format() : null,
    };

    try {
      if (initialValues) {
        await updateTodo(initialValues.id, todoData);
      } else {
        await createTodo(todoData);
      }
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit Todo' : 'Create New Todo'}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={600}
      styles={{ body: { paddingTop: 20 } }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter todo title' }]}
        >
          <Input placeholder="Enter todo title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea 
            rows={3} 
            placeholder="Enter todo description (optional)" 
          />
        </Form.Item>

        <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
          <Form.Item
            name="priority"
            label="Priority"
            initialValue="medium"
          >
            <Select style={{ width: 120 }}>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Category"
          >
            <Select 
              style={{ width: 150 }} 
              placeholder="Select category"
              dropdownRender={menu => (
                <>
                  {menu}
                  <div style={{ padding: '8px', borderTop: '1px solid #d9d9d9' }}>
                    <CategoryForm onSuccess={fetchCategories} />
                  </div>
                </>
              )}
            >
              {categories.map(category => (
                <Option key={category.id} value={category.id}>
                  <Space>
                    <div 
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: category.color,
                        borderRadius: '50%'
                      }}
                    />
                    {category.name}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="due_date"
            label="Due Date"
          >
            <DatePicker 
              showTime 
              format="YYYY-MM-DD HH:mm"
              style={{ width: 180 }}
              placeholder="Select due date"
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default TodoForm;