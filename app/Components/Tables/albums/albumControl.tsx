'use client';

import type { TableColumnsType } from 'antd';
import { Table, Dropdown, Menu, Button, message } from 'antd';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import Upload from '../../Header/UploadButton/Upload';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import Text from '../../Text/Text';
import { TextHtmlTypeEnum } from '../../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../Text/enums/text-type.enum';
import HitsItemDisplay from '../artists/hitsitems/hitsItems';
import styles from './albumControl.module.scss';
import { TableDataType } from '@/app/(authorized)/albums/interfaces/music.interface';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';

interface AlbumControlPageProps {
  data: TableDataType[];
}

const AlbumControlPage: React.FC<AlbumControlPageProps> = ({ data }) => {
  const { mutate } = useSWR('/albums', fetcher);

  const handleDelete = async (albumId: number): Promise<void> => {
    try {
      await ApiClient.delete(`/albums/${albumId}`).then(() => {
        mutate('/albums');
      });

      message.success('Album deleted successfully');
    } catch (error) {
      message.error('Failed to delete album');
    }
  };

  const menu = (albumId: number): React.JSX.Element => (
    <Menu>
      <Menu.Item key="1">
        <Link href={`/albums/edit/${albumId}`}>
          <Icon name={IconNameEnum.EditArtist} width={24} height={24} />
          Edit Album
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDelete(albumId)}>
        <div>
          <Icon name={IconNameEnum.Delete} width={24} height={24} />
          <Text
            htmlType={TextHtmlTypeEnum.Span}
            type={TextTypeEnum.SecondaryTextSmall}
          >
            Delete
          </Text>
        </div>
      </Menu.Item>
    </Menu>
  );

  const columns: TableColumnsType<TableDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, record: TableDataType): React.JSX.Element => {
        console.log(record);

        return (
          <HitsItemDisplay
            item={{
              artistName:
                record.artists
                  ?.map((artist) => `${artist.firstName} ${artist.lastName}`)
                  .join(', ') || 'Unknown Artist',
              name: record.name,
              backgroundImage: record.imgUrl || '',
            }}
          />
        );
      },
    },

    {
      title: 'Musics',
      dataIndex: 'musics',
      render: (musics): JSX.Element => {
        return <div>{musics}</div>;
      },
    },

    {
      title: '',
      key: 'action',
      render: (_, record: TableDataType) => (
        <Dropdown
          overlay={menu(record.id)}
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

  return (
    <div className={styles.container}>
      <Upload href={'/createAlbum'} icon={IconNameEnum.WhitePlus}>
        Upload Albums
      </Upload>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default AlbumControlPage;
