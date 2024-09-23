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

const AddAlbumForm = (props: { params: { id: number } }): JSX.Element => {
  const { register, handleSubmit, reset } = useForm();
  const { data } = useSWR<AlbumInterface>(
    `/albums/${props.params.id}`,
    fetcher,
  );

  console.log(data);

  const onSubmit = async (values: FieldValues): Promise<void> => {
    console.log('here');
    const data: FormData = new FormData();

    data.append('name', values.name);
    data.append('releaseDate', values.releaseDate);
    data.append('file', values.file[0]);

    const token: string | null = getCookie('accessToken');

    const response = async (): Promise<void> => {
      try {
        await axios.put(
          `https://back.dnck.ge/albums/${props.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response);
      } catch {
        console.error('Error updating album:');
      }
    };
  };

  useEffect(() => {
    if (data) {
      reset({
        email: data.name,
        password: data,
      });
    }
  }, [data]);

  return (
    <div className={styles.addArtist}>
      <h1>Change Password</h1>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <label>User Name</label>
          <input
            {...register('name', { maxLength: 32 })}
            className={styles.smallInput}
            placeholder="User Name."
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
