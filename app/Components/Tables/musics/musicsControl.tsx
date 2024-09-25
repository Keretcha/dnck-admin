'use client';

import type { TableColumnsType } from 'antd';
import { Table, Dropdown, Button, message, Menu } from 'antd';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import Upload from '../../Header/UploadButton/Upload';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import Text from '../../Text/Text';
import { TextHtmlTypeEnum } from '../../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../Text/enums/text-type.enum';
import DataType from '../artists/interfaces/artistControl-props.interface';
import HitsItemDisplay from './hitsitems/hitsItems';
import styles from './musicsControl.module.scss';
import { MusicInterface } from '@/app/(authorized)/albums/interfaces/music.interface';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';

interface MusicControlPageProps {
  data?: DataType[];
  musics?: MusicInterface[];
}

const MusicControlPage: React.FC<MusicControlPageProps> = () => {
  const { data, mutate } = useSWR<MusicInterface[]>('/musics', fetcher);

  const handleDelete = async (musicId: number): Promise<void> => {
    try {
      await ApiClient.delete(`/musics/${musicId}`);
      mutate();
      message.success('Music deleted successfully');
    } catch (error) {
      message.error('Failed to delete music');
    }
  };

  const menu = (musicId: number): React.JSX.Element => (
    <Menu>
      <Menu.Item className={styles.menuItem} key="1">
        <Link href={`/musics/edit/${musicId}`}>
          <Icon name={IconNameEnum.EditArtist} width={24} height={24} />
          Edit Music
        </Link>
      </Menu.Item>
      <Menu.Item
        onClick={() => handleDelete(musicId)}
        className={styles.menuItemDelete}
        key="2"
      >
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
      render: (text, record: MusicInterface) => (
        <HitsItemDisplay
          item={{
            name: record.name,
            backgroundImage: record?.album?.history?.location,
            albumName: record.name,
          }}
        />
      ),
    },
    {
      title: '',
      key: 'action',
      width: 20,
      render: (record: MusicInterface) => (
        <Dropdown
          overlay={menu(record.id)}
          trigger={['click']}
          placement="bottomRight"
        >
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
      <Upload href={'/addMusic'} icon={IconNameEnum.WhitePlus}>
        Upload Music
      </Upload>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default MusicControlPage;
