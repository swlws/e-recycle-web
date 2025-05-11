import api from '@/api';
import CommonTable from '@/components/common-table';

// 模拟后端接口
const mockLoadList = async (params: any) => {
  console.log(params);
  const { page, pageSize } = params;
  return api.auth
    .userList({
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
  { title: 'ID', dataIndex: '_id' },
  { title: 'OpenID', dataIndex: 'openid' },
  { title: 'nickName', dataIndex: 'nickName' },
  { title: 'Phone', dataIndex: 'phoneNumber' },
  { title: 'lastLoginTime', dataIndex: 'lastLoginTime' },
  { title: 'createTime', dataIndex: 'createTime' },
];

export default function UserCenter() {
  return (
    <article>
      <CommonTable columns={columns} loadList={mockLoadList} />
    </article>
  );
}
