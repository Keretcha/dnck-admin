'use client';

import type { TableColumnsType } from 'antd';
import { Table, Dropdown, Menu, Button, message } from 'antd';
import React from 'react';
import useSWR from 'swr';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import Text from '../../Text/Text';
import { TextHtmlTypeEnum } from '../../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../Text/enums/text-type.enum';
import HitsItemDisplay from '../artists/hitsitems/hitsItems';
import styles from './albumControl.module.scss';
import { AlbumInterface } from '@/app/(authorized)/albums/interfaces/albums.interfaces';
import { fetcher } from '@/app/api/fetcher';
import axios from 'axios';
import Link from 'next/link';

const AlbumControlPage: React.FC = () => {
  const { data: albums, mutate } = useSWR<AlbumInterface[]>(`/albums`, fetcher);

  const handleDelete = async (albumId: number): Promise<void> => {
    try {
      await axios.delete(`http://10.10.51.20:3000/albums/${albumId}`, {
        method: 'DELETE',
      });

      if (albums) {
        const updatedAlbums: AlbumInterface[] = albums.filter(
          (album) => album.id !== albumId,
        );
        mutate(updatedAlbums, false);
      }

      message.success('Album deleted successfully');
    } catch (error) {
      message.error('Failed to delete album');
    }
  };

  const menu = (albumId: number): React.JSX.Element => (
    <Menu>
      <Menu.Item className={styles.menuItem} key="1">
        <Link href={}>
          <Icon name={IconNameEnum.EditArtist} width={24} height={24} />
          Edit Artist
        </Link>
      </Menu.Item>
      <Menu.Item
        className={styles.menuItemDelete}
        key="2"
        onClick={() => handleDelete(albumId)}
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

  const columns: TableColumnsType<AlbumInterface> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => {
        console.log(record, 'rec');
        return (
          <HitsItemDisplay
            item={{
              artistName: record?.artists?.reduce((acc, curr) => {
                const fullName = curr.firstName + ' ' + curr.lastName;
                return (acc += fullName);
              }, ''),
              name: record.name,
              backgroundImage: record?.history?.location,
            }}
          />
        );
      },
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
      render: (_, record) => (
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

  const data: any = albums
    ? albums?.map((album, index) => ({
        key: index.toString(),
        id: album.id,
        name: album.name,
        musics: album.tracks?.length || 0,
        history: album.history,
        artists: album.artists,
      }))
    : [];

  console.log(data, 'aee');

  return (
    <div className={styles.container}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default AlbumControlPage;
