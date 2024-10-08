'use client';
import { AxiosResponse } from 'axios';
import router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { MusicInterface } from '../albums/interfaces/music.interface';
import MusicControlPage from '@/app/Components/Tables/musics/musicsControl';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';

export default function Home(): JSX.Element {
  const { data: musics } = useSWR<MusicInterface[]>(`/musics`, fetcher);

  useEffect(() => {
    const fetchMusics = async (): Promise<void> => {
      try {
        const response: AxiosResponse<DataType[]> =
          await ApiClient.get('/musics');
        console.log(response.data);

        localStorage.setItem('response.data', JSON.stringify(response.data));
        router.push('/uploaded');
      } catch (err) {
        console.error('Cannot load this page', err);
      }
    };
    fetchMusics();
  }, []);

  type DataType = MusicInterface[];
  const transformedMusics: MusicInterface[] = musics
    ? musics.map((music) => ({
        id: music.id,
        name: music.name,
        album: music.album,
        src: music.src,
        history: music.history,
      }))
    : [];

  return (
    <div>
      <MusicControlPage data={transformedMusics} />
    </div>
  );
}
