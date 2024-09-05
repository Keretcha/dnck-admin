'use client';
import axios, { AxiosResponse } from 'axios';
import router from 'next/router';
import { useEffect, useState } from 'react';
import AlbumCards from '../../Components/AlbumCards/AlbumCards';
import { AlbumCardItemsInterface } from '@/app/Components/AlbumCard/interfaces/album-card-items.interface';

export default function Home(): JSX.Element {
  const [albums, setAlbums] = useState<AlbumCardItemsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async (): Promise<void> => {
      try {
        const response: AxiosResponse<AlbumCardItemsInterface[]> =
          await axios.get('http://10.10.51.20:3000/albums');
        setAlbums(response.data);
        localStorage.setItem('response.data', JSON.stringify(response.data));
        router.push('/uploaded');
      } catch (err) {
        console.error('Cannot load this page', err);
        setError('An error occurred while fetching albums.');
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <AlbumCards items={albums} />
    </div>
  );
}
