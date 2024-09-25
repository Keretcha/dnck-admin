'use client';

import useSWR from 'swr';
import { AlbumInterface } from './interfaces/albums.interfaces';
import { TableDataType } from './interfaces/music.interface';
import AlbumControlPage from '@/app/Components/Tables/albums/albumControl';
import { fetcher } from '@/app/api/fetcher';
import { useRouter } from 'next/navigation';

export default function Home(): JSX.Element {
  const { data: albums } = useSWR<AlbumInterface[]>(`/albums`, fetcher);
  const router = useRouter()

  const tableData: TableDataType[] = albums
    ? albums?.map?.((album, index) => {
        console.log(album);
        return {
          key: index.toString(),
          name: album.artists[0]?.name || 'Unknown Artist',
          musics: album.musics?.length || 0,
          albums: album.name,
        };
      })
    : [];

  console.log(tableData);
  console.log(albums, ' saba mtkvenlia')
  return (
    <div>
      <AlbumControlPage data={tableData} />
    </div>
  );
}
