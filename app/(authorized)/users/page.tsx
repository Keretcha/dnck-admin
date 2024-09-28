'use client';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { UserInterface } from '@/app/Components/Tables/users/interfaces/users-control.interfaces';
import UsersTable from '@/app/Components/Tables/users/usersControl';
import { fetcher } from '@/app/api/fetcher';

export default function UsersPage(): JSX.Element {
  const { data: users, error } = useSWR<UserInterface[]>('/users', fetcher);
  const [loading, setLoading] = useState<boolean>(!users && !error);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response: AxiosResponse<UserInterface[]> = await axios.get(
          'https://back.dnck.ge/users',
        );
        localStorage.setItem('response.data', JSON.stringify(response.data));
      } catch (err) {
        console.error('Cannot load this page', err);
      } finally {
        setLoading(false);
      }
    };

    if (!users) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load users.</div>;
  }

  console.log('Users state:', users);

  return (
    <div>
      <UsersTable />
    </div>
  );
}
