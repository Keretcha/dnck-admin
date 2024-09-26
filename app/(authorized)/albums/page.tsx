'use client';

import useSWR from 'swr';
import { AlbumInterface } from './interfaces/albums.interfaces';
import { TableDataType } from './interfaces/music.interface';
import AlbumControlPage from '@/app/Components/Tables/albums/albumControl';
import { fetcher } from '@/app/api/fetcher';

export default function Home(): JSX.Element {
  const { data: albums } = useSWR<AlbumInterface[]>(`/albums`, fetcher);

  const tableData: TableDataType[] = albums
    ? albums?.map?.((album, index) => {
        console.log(album);
        return {
          key: index.toString(),
          name: album.name,
          musics: album.musics?.length || 0,
          id: album.id,
        };
      })
    : [];

  return (
    <div>
      <AlbumControlPage data={tableData} />
    </div>
  );
}
