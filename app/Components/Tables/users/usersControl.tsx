import { message, Menu, Button, TableColumnsType, Dropdown, Table } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import useSWR from 'swr';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import Text from '../../Text/Text';
import { TextHtmlTypeEnum } from '../../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../Text/enums/text-type.enum';
import { UserInterface } from './interfaces/users-control.interfaces';
import styles from './usersControl.module.scss';
import { fetcher } from '@/app/api/fetcher';
import { getCookie } from '@/helpers/cookies';

const UsersTable: React.FC = () => {
  const { data: users = [], mutate } = useSWR<UserInterface[]>(
    '/users',
    fetcher,
  );
  const token: string | null = getCookie('accessToken');

  const handleDelete = async (userId: number): Promise<void> => {
    if (!token) {
      message.error('No access token available');
      return;
    }

    try {
      await axios.delete(`https://back.dnck.ge/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUsers: UserInterface[] = users.filter(
        (user) => user.id !== userId,
      );
      mutate(updatedUsers, true);
      message.success('User deleted successfully');
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleUnblock = async (userId: number): Promise<void> => {
    if (!token) {
      message.error('No access token available');
      return;
    }

    try {
      await axios.patch(
        `https://back.dnck.ge/users/unblock/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedUsers: UserInterface[] = users.map((user) =>
        user.id === userId ? { ...user, blocked: false } : user,
      );
      mutate(updatedUsers, false);
      message.success('User unblocked successfully');
    } catch (error) {
      message.error('Failed to unblock user');
    }
  };

  const menu = (user: UserInterface): React.ReactElement => (
    <Menu>
      <Menu.Item className={styles.menuItem} key="1">
        <Link href={`/users/edit/${user.id}`} className={styles.edit}>
          <Icon name={IconNameEnum.Lock} width={24} height={24} />
          Change Password
        </Link>
      </Menu.Item>
      {user.deletedAt ? (
        <Menu.Item
          className={styles.menuItemUnblock}
          key="2"
          onClick={() => handleUnblock(user.id)}
        >
          <Text
            htmlType={TextHtmlTypeEnum.Span}
            type={TextTypeEnum.SecondaryTextSmall}
            className={styles.unblock}
          >
            Unblock
          </Text>
        </Menu.Item>
      ) : (
        <Menu.Item
          className={styles.menuItemDelete}
          key="3"
          onClick={() => handleDelete(user.id)}
        >
          <Icon name={IconNameEnum.Block} width={24} height={24} />
          <Text
            htmlType={TextHtmlTypeEnum.Span}
            type={TextTypeEnum.SecondaryTextSmall}
          >
            Block
          </Text>
        </Menu.Item>
      )}
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
      render: (_: string, record: UserInterface) => (
        <Dropdown
          overlay={menu(record)}
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

  if (!users.length) return <div className={styles.load}>Loading...</div>;

  return (
    <div>
      <Table columns={columns} dataSource={users} pagination={false} />
    </div>
  );
};

export default UsersTable;
