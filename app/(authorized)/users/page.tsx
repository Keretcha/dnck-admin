'use client';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { UserInterface } from '@/app/Components/Tables/users/interfaces/users-control.interfaces';
import UsersTable from '@/app/Components/Tables/users/usersControl';

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response: AxiosResponse<UserInterface> = await axios.get(
          'https://back.dnck.ge/users',
        );
        console.log('Fetched users:', response.data);
        setUsers(response.data);
        localStorage.setItem('response.data', JSON.stringify(response.data));
      } catch (err) {
        console.error('Cannot load this page', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('Users state:', users); // Log users before rendering

  return (
    <div>
      <UsersTable data={users} />
    </div>
  );
}
