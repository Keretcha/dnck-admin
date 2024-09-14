'use client';
import type { TableColumnsType } from 'antd';
import { Table, Dropdown, Menu, Button } from 'antd';
import React from 'react';
import { HitsItems } from '../../HitsCard/HitsItems/HitsItems';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import Text from '../../Text/Text';
import { TextHtmlTypeEnum } from '../../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../Text/enums/text-type.enum';
import styles from './artistControl.module.scss';
import HitsItemDisplay from './hitsitems/hitsItems';
import DataType from './interfaces/artistControl-props.interface';

// Define menu items for dropdown
const menu: React.JSX.Element = (
  <Menu>
    <Menu.Item className={styles.menuItem} key="1">
      {' '}
      <Icon name={IconNameEnum.EditArtist} width={24} height={24} />
      Edit Artist
    </Menu.Item>
    <Menu.Item className={styles.menuItemDelete} key="2">
      {' '}
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

const data: DataType[] = [
  {
    key: '1',
    name: HitsItems[1],
    musics: 'gela gela gela',
    albums: '22 Album',
  },
  {
    key: '2',
    name: HitsItems[2],
    musics: '10',
    albums: '22 Album',
  },
  {
    key: '3',
    name: HitsItems[3],
    musics: '10',
    albums: '22 Album',
  },
  {
    key: '4',
    name: HitsItems[4],
    musics: '10',
    albums: '22 Album',
  },
  {
    key: '5',
    name: HitsItems[4],
    musics: '10',
    albums: '22 Album',
  },
];

const App: React.FC = () => (
  <div className={styles.container}>
    <Table columns={columns} dataSource={data} pagination={false} />
  </div>
);

export default App;
