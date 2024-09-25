'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';
import styles from './page.module.scss';
import { AlbumInterface } from '@/app/(authorized)/albums/interfaces/albums.interfaces';
import Button from '@/app/Components/Button/Button';
import { ButtonTypeEnum } from '@/app/Components/Button/enums/button-type.enum';
import { fetcher } from '@/app/api/fetcher';
import { getCookie } from '@/helpers/cookies'; // Adjust import if necessary
import { UserInterface } from '@/app/Components/Tables/users/interfaces/users-control.interfaces';

const AddAlbumForm = (props: { params: { id: number } }): JSX.Element => {
  const { register, handleSubmit, reset } = useForm();
  const { data } = useSWR<UserInterface>(`/users/${props.params.id}`, fetcher);

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();

    data.append('email', values.email);
    data.append('password', values.password);
    data.append('password', values.password);

    const token: string | null = getCookie('accessToken');

    const response = async (): Promise<void> => {
      try {
        await axios.put(`https://back.dnck.ge/users/${props.params.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
      } catch {
        console.error('Error updating album:');
      }
    };
  };

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        password: data.password,
      });
    }
  }, [data]);

  return (
    <div className={styles.addArtist}>
      <h1>Change Password</h1>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <label>User Email</label>
          <input
            type="email"
            {...register('email', { maxLength: 32 })}
            className={styles.smallInput}
            placeholder="User Email."
          />
        </div>
        <div className={styles.inputs}>
          <label>New Password</label>
          <input
            type="password"
            {...register('password')}
            className={styles.smallInput}
            placeholder="Password"
          />
        </div>
        <div className={styles.inputs}>
          <label>Re-enter Password</label>
          <input
            type="password"
            {...register('password')}
            className={styles.smallInput}
            placeholder="Re-enter Password"
          />
        </div>
        <Button
          className={styles.uploadButton}
          htmlType="submit"
          type={ButtonTypeEnum.Primary}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default AddAlbumForm;
