'use client';
import axios, { AxiosResponse } from 'axios';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { HitsCardItemsInterface } from '@/app/Components/HitsCard/interfaces/hits-card-items.interface';
import HitsCards from '@/app/Components/HitsCards/HitsCards';

export default function Home(): JSX.Element {
  const [music, setMusic] = useState<HitsCardItemsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMusics = async (): Promise<void> => {
      try {
        const response: AxiosResponse<HitsCardItemsInterface[]> =
          await axios.get('https:dnck-back.ge/music');
        setMusic(response.data);
        localStorage.setItem('response.data', JSON.stringify(response.data));
        router.push('/uploaded');
      } catch (err) {
        console.error('Cannot load this page', err);
        setError('An error occurred while fetching albums.');
      } finally {
        setLoading(false);
      }
    };
    fetchMusics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <HitsCards items={music} />
    </div>
  );
}
