'use client';

import { Table, Dropdown, Menu, Button, message } from 'antd';
import { ColumnType } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Icon from '../../Icon/Icon';
import { IconNameEnum } from '../../Icon/enums/icon-name.enum';
import styles from './artistControl.module.scss';
import HitsItemDisplay from './hitsitems/hitsItems';
import { ArtistInterface } from '@/app/(authorized)/albums/interfaces/artist.interfaces';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';
import Upload from '../../Header/UploadButton/Upload';
import Link from 'next/link';

const ArtistControlTable: React.FC = () => {
  const { data: initialData } = useSWR<ArtistInterface[]>('/artists', fetcher);
  const [artists, setArtists] = useState<ArtistInterface[]>(initialData || []);
  const { mutate } = useSWR('/artists', fetcher);

  useEffect(() => {
    if (initialData) {
      setArtists(initialData);
      console.log(initialData);
    }
  }, [initialData]);

  const handleDelete = async (artistId: number): Promise<void> => {
    try {
      await ApiClient.delete(`/artists/${artistId}`, {}).then(() => {
        mutate('/artists');
      });
      setArtists((prevArtists) =>
        prevArtists?.filter?.((artist) => artist.id !== artistId),
      );
      message?.success('Artist deleted successfully');
    } catch (error) {
      message?.error('Failed to delete artist');
    }
  };

  const menu = (artistId: number): React.ReactElement => (
    <Menu>
      <Menu.Item className={styles.menuItem} key="edit">
        <Icon name={IconNameEnum.EditArtist} width={24} height={24} />
        Edit Artist
      </Menu.Item>
      <Menu.Item
        className={styles.menuItemDelete}
        key="delete"
        onClick={() => handleDelete(artistId)}
      >
        <Icon name={IconNameEnum.Delete} width={24} height={24} />
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns: ColumnType<ArtistInterface>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, record: ArtistInterface) => (
        <HitsItemDisplay
          item={{
            name: `${record.firstName} ${record.lastName}`,
            backgroundImage: record?.history?.location,
            albumName: `${record.biography}`,
          }}
        />
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, record: ArtistInterface) => (
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
      <Upload href={'/createArtist'}>Upload Artist</Upload>
      <Table columns={columns} dataSource={artists} pagination={false} />
    </div>
  );
};

export default ArtistControlTable;
