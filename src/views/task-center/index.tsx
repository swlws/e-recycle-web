import api from '@/api';
import CommonTable from '@/components/common-table';

// 模拟后端接口
const mockLoadList = async (params: any) => {
  console.log(params);
  const { page, pageSize } = params;
  return api.task
    .queryAllTask({
      page,
      size: pageSize,
    })
    .then(({ res }) => {
      const { total, list } = res;
      return {
        data: list,
        total,
      };
    });
};

const columns = [
  { title: 'Goods', dataIndex: 'goods' },
  {
    title: 'snapshot',
    dataIndex: 'snapshot',
    render: (value: any, record: any) => {
      const list = record?.snapshot?.map((item: any) => item.url);
      return (
        <>
          {list?.map((item: any, index: number) => (
            <img key={index} src={item} alt="" width={80} height={80} />
          ))}
        </>
      );
    },
  },
  {
    title: 'location',
    dataIndex: 'location',
    render: (value: any, record: any) => {
      const { name, address } = record?.location || {};
      return (
        <>
          <header>{name}</header>
          <p>{address}</p>
        </>
      );
    },
  },
  { title: 'pickupTime', dataIndex: 'pickupTime' },
  { title: 'state', dataIndex: 'state' },
  { title: 'person', dataIndex: 'person' },
  { title: 'phoneNumber', dataIndex: 'phoneNumber' },
];

export default function TaskCenter() {
  return (
    <article>
      <CommonTable columns={columns} loadList={mockLoadList} />
    </article>
  );
}
