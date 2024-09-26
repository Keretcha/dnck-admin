import { message, Menu, TableColumnsType, Dropdown, Button, Table } from 'antd';
import Link from 'next/link';
import useSWR from 'swr';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import Text from '../../Text/Text';
import { TextHtmlTypeEnum } from '../../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../Text/enums/text-type.enum';
import { UserInterface } from './interfaces/users-control.interfaces';
import styles from './usersControl.module.scss';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';

interface UsersTableProps {
  data: UserInterface[];
}

const UsersTable: React.FC<UsersTableProps> = ({ data }) => {
  const { mutate } = useSWR<UserInterface[]>('/users', fetcher);

  const handleBlock = async (userId: number): Promise<void> => {
    console.log(`Attempting to block user with ID: ${userId}`);

    try {
      await ApiClient.delete(`/users/${userId}`);
      mutate();
    } catch (error) {
      console.error('Error blocking user:', error);
      message.error('Failed to block user');
    }
  };

  const renderMenu = (userId: number): React.ReactElement => (
    <Menu>
      <Menu.Item key="edit">
        <Link href={`/users/edit/${userId}`} className={styles.edit}>
          <Icon name={IconNameEnum.Lock} width={24} height={24} />
          Change Password
        </Link>
      </Menu.Item>
      <Menu.Item key="block" onClick={() => handleBlock(userId)}>
        <div className={styles.block}>
          <Icon name={IconNameEnum.Block} width={24} height={24} />
          <Text
            htmlType={TextHtmlTypeEnum.Span}
            type={TextTypeEnum.SecondaryTextSmall}
          >
            Block
          </Text>
        </div>
      </Menu.Item>
    </Menu>
  );

  const columns: TableColumnsType<UserInterface> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: UserInterface) => (
        <Dropdown
          overlay={renderMenu(record.id)}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            icon={<Icon name={IconNameEnum.Dot} width={24} height={24} />}
          />
        </Dropdown>
      ),
    },
  ];

  if (!data.length) return <div className={styles.load}>Loading...</div>;

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default UsersTable;
