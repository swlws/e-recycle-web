import CommonTable from '@/components/common-table';

// 模拟后端接口
const mockLoadList = async (params: any) => {
  console.log('加载参数:', params);
  // 模拟异步延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  const total = 45;
  const data = Array.from({ length: params.pageSize }, (_, i) => ({
    id: (params.page - 1) * params.pageSize + i + 1,
    name: `用户 ${(params.page - 1) * params.pageSize + i + 1}`,
    age: Math.floor(Math.random() * 40) + 20,
  }));

  return { data, total };
};

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
];

export default function Home() {
  <div>
    <h2>用户列表</h2>
    <CommonTable columns={columns} loadList={mockLoadList} />
  </div>;
}
