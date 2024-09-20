'use client';
import type { TableColumnsType } from 'antd';
import { Table, Dropdown, Menu, Button } from 'antd';
import React from 'react';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import Text from '../../Text/Text';
import { TextHtmlTypeEnum } from '../../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../Text/enums/text-type.enum';
import HitsItemDisplay from '../artists/hitsitems/hitsItems';
import DataType from '../artists/interfaces/artistControl-props.interface';
import styles from './musicsControl.module.scss';

interface MusicControlPageProps {
  data: DataType[];
}

const MusicControlPage: React.FC<MusicControlPageProps> = ({ data }) => {
  const menu: React.JSX.Element = (
    <Menu>
      <Menu.Item className={styles.menuItem} key="1">
        <Icon name={IconNameEnum.EditArtist} width={24} height={24} />
        Edit Artist
      </Menu.Item>
      <Menu.Item className={styles.menuItemDelete} key="2">
        <Icon name={IconNameEnum.Delete} width={24} height={24} />
        <Text
          htmlType={TextHtmlTypeEnum.Span}
          type={TextTypeEnum.SecondaryTextSmall}
        >
          Delete
        </Text>
      </Menu.Item>
    </Menu>
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <HitsItemDisplay item={record.name} />,
    },
    {
      title: 'Musics',
      dataIndex: 'musics',
    },
    {
      title: 'Albums',
      dataIndex: 'albums',
    },
    {
      title: '',
      key: 'action',
      width: 20,
      render: () => (
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Button
            icon={<Icon name={IconNameEnum.Dot} width={24} height={24} />}
            className={styles.dropdownButton}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default MusicControlPage;
