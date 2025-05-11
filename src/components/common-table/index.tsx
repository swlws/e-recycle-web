import React, { useEffect, useState } from 'react';
import { Table, Form, Input, Button, Space } from 'antd';

interface CommonTableProps {
  columns: any[]; // 表格列配置
  loadList: (params: any) => Promise<{ data: any[]; total: number }>;
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, loadList }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const fetchData = async (extraParams = {}) => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const params = {
        ...values,
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...extraParams,
      };
      const res = await loadList(params);
      setData(res.data);
      setTotal(res.total);
    } catch (error) {
      console.error(error);
      // 验证失败或其他错误
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const handleSearch = () => {
    setPagination({ ...pagination, current: 1 }); // 重置页码
    fetchData({ page: 1 });
  };

  const handleReset = () => {
    form.resetFields();
    setPagination({ ...pagination, current: 1 });
    fetchData({ page: 1 });
  };

  const handleChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  return (
    <div>
      {/* 查询区域 */}
      <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="keyword" label="关键词">
          <Input placeholder="请输入关键词" />
        </Form.Item>
        <Space>
          <Button type="primary" onClick={handleSearch}>
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
      </Form>

      {/* 表格区域 */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total,
          showTotal: (total) => `共 ${total} 条`,
          showSizeChanger: true,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default CommonTable;
