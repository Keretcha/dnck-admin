'use client';
import axios, { AxiosResponse } from 'axios';
import router from 'next/router';
import { useEffect, useState } from 'react'; // Adjust the path accordingly
import DataType from '@/app/Components/Tables/artists/interfaces/artistControl-props.interface';
import UsersTable from '@/app/Components/Tables/users/usersControl';

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response: AxiosResponse<DataType[]> = await axios.get(
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
