'use client';

import type { TableColumnsType } from 'antd';
import { Table, Dropdown, Menu, Button, message } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import Text from '../../Text/Text';
import { TextHtmlTypeEnum } from '../../Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../../Text/enums/text-type.enum';
import HitsItemDisplay from '../artists/hitsitems/hitsItems';
import styles from './albumControl.module.scss';
import { AlbumInterface } from '@/app/(authorized)/albums/interfaces/albums.interfaces';
import { TableDataType } from '@/app/(authorized)/albums/interfaces/track.interface';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';
import Upload from '../../Header/UploadButton/Upload';

const AlbumControlPage: React.FC = () => {
  const { data: initialData } = useSWR<AlbumInterface[]>(`/albums`, fetcher);
  const { mutate } = useSWR('/albums', fetcher);

  const handleDelete = async (albumId: number): Promise<void> => {
    try {
      await ApiClient.delete(`/albums/${albumId}`, {}).then(() => {
        mutate('/albums');
      });

      if (initialData) {
        const updatedAlbums: AlbumInterface[] = initialData.filter(
          (album) => album.id !== albumId,
          alert,
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
        <Link href={`/albums/edit/${albumId}`} className={styles.edit}>
          <Icon name={IconNameEnum.EditArtist} width={24} height={24} />
          Edit Album
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDelete(albumId)}>
        <div className={styles.menuItemDelete}>
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

  const columns: TableColumnsType<AlbumInterface> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, record: AlbumInterface): React.JSX.Element => {
        const artistNames: string =
          record.artists
            ?.map((artist) => `${artist.firstName} ${artist.lastName}`)
            .join(', ') || 'Unknown Artist';

        return (
          <HitsItemDisplay
            item={{
              artistName: artistNames,
              name: record.name,
              backgroundImage: record.history?.location,
            }}
          />
        );
      },
    },
    {
      title: 'Musics',
      dataIndex: 'musics',
      render: (musics: any[]): number => musics.length,
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

  const data: TableDataType[] = initialData
    ? initialData?.map?.((album) => ({
        key: album.id,
        id: album.id,
        name: album.name,
        musics: album.musics || [],
        history: album.history,
        artists: album.artists,
      }))
    : [];

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
