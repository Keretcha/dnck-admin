'use client';

import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';
import styles from './page.module.scss';
import Button from '@/app/Components/Button/Button';
import { ButtonTypeEnum } from '@/app/Components/Button/enums/button-type.enum';
import { UserInterface } from '@/app/Components/Tables/users/interfaces/users-control.interfaces';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';
import { getCookie } from '@/helpers/cookies';

const AddAlbumForm = (props: { params: { id: number } }): JSX.Element => {
  const { register, handleSubmit, reset, watch } = useForm();
  const { data } = useSWR<UserInterface>(`/users/${props.params.id}`, fetcher);
  const router: AppRouterInstance = useRouter();

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const { password } = values;

    if (password !== watch('rePassword')) {
      alert('Passwords do not match');
      return;
    }

    const token: string | null = getCookie('accessToken');

    try {
      const response: AxiosResponse = await ApiClient.patch(
        `/users/password/${props.params.id}`,
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      router.push('/users');
      message.success('Password updated successfully:', response.data);
    } catch (error) {
      message.error('Error updating password:');
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
      });
    }
  }, [data, reset]);

  return (
    <div className={styles.addArtist}>
      <h1>Change Password</h1>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <label>New Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className={styles.smallInput}
            placeholder="Password"
          />
        </div>
        <div className={styles.inputs}>
          <label>Re-enter Password</label>
          <input
            type="password"
            {...register('rePassword', { required: true })}
            className={styles.smallInput}
            placeholder="Re-enter Password"
          />
        </div>
        <Button
          className={styles.uploadButton}
          htmlType="submit"
          type={ButtonTypeEnum.Primary}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default AddAlbumForm;
