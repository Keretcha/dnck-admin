// UsersPage.tsx

'use client';
import axios, { AxiosResponse } from 'axios';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { UserInterface } from '@/app/Components/Tables/users/interfaces/users-control.interfaces';
import UsersTable from '@/app/Components/Tables/users/usersControl';

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<UserInterface[]>([]); // Update this to UserInterface

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response: AxiosResponse<UserInterface[]> = await axios.get(
          'https://back.dnck.ge/users',
        );
        setUsers(response.data);
        localStorage.setItem('response.data', JSON.stringify(response.data));
        router.push('/uploaded');
      } catch (err) {
        console.error('Cannot load this page', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <UsersTable data={users} />
    </div>
  );
}
