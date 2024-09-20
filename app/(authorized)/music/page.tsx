'use client';
import axios, { AxiosResponse } from 'axios';
import router from 'next/router';
import { useEffect, useState } from 'react';
import DataType from '@/app/Components/Tables/artists/interfaces/artistControl-props.interface';
import MusicControlPage from '@/app/Components/Tables/musics/musicsControl';

export default function Home(): JSX.Element {
  const [music, setMusic] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchMusics = async (): Promise<void> => {
      try {
        const response: AxiosResponse<DataType[]> = await axios.get(
          'https://dnck-back.ge/musics',
        );
        setMusic(response.data);
        localStorage.setItem('response.data', JSON.stringify(response.data));
        router.push('/uploaded');
      } catch (err) {
        console.error('Cannot load this page', err);
      }
    };
    fetchMusics();
  }, []);

  return (
    <div>
      <MusicControlPage data={music} />
    </div>
  );
}
