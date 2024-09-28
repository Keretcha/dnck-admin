'use client';
import { Button, Dropdown, message, Table, TableColumnsType, Menu } from 'antd';
import Link from 'next/link';
import useSWR from 'swr';
import styles from './SingleAlbumPage.module.scss';
import { MusicInterface } from '@/app/(authorized)/albums/interfaces/music.interface';
import Icon from '@/app/Components/Icon/Icon';
import { IconNameEnum } from '@/app/Components/Icon/enums/icon-name.enum';
import HitsItemDisplay from '@/app/Components/Tables/artists/hitsitems/hitsItems';
import Text from '@/app/Components/Text/Text';
import { TextHtmlTypeEnum } from '@/app/Components/Text/enums/text-html-type.enum';
import { TextTypeEnum } from '@/app/Components/Text/enums/text-type.enum';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';

const AlbumMusics = (props: { params: { id: number } }): JSX.Element => {
  const { data, error, mutate } = useSWR<{ musics: MusicInterface[] }>(
    `/albums/${props.params.id}`,
    fetcher,
  );

  if (error) {
    message.error(`Failed to load music: ${error.message}`);
    return <div>Error loading music</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const musics: MusicInterface[] = Array.isArray(data.musics)
    ? data.musics
    : [];

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

  type DataType = MusicInterface;

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_text, record: MusicInterface) => (
        <HitsItemDisplay
          item={{
            name: record.name,
            backgroundImage: record?.album?.history?.location,
            albumName: record?.name,
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
    <div>
      <Table columns={columns} dataSource={musics} rowKey="id" />
    </div>
  );
};

export default AlbumMusics;
