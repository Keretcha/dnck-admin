'use client';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';
import styles from './page.module.scss';
import Button from '@/app/Components/Button/Button';
import { ButtonTypeEnum } from '@/app/Components/Button/enums/button-type.enum';
import { fetcher } from '@/app/api/fetcher';
import { getCookie } from '@/helpers/cookies';
import { MusicInterface } from '@/app/(authorized)/albums/interfaces/track.interface';
import { ApiClient } from '@/app/api/api';
import { message } from 'antd';

const AddAlbumForm = (props: { params: { id: number } }): JSX.Element => {
  const { register, handleSubmit, reset } = useForm();
  const { data: musicData } = useSWR<MusicInterface>(
    `/musics/${props.params.id}`,
    fetcher,
  );
  const { data: albumsData } = useSWR('/albums', fetcher);

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();
    data.append('name', values.name);
    data.append('albumId', values.albumId);
    data.append('file', values.src[0]);

    const token: string | null = getCookie('accessToken');

    try {
      await ApiClient.put(`/musics/${props.params.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Album updated successfully!');
    } catch (error) {
      message.error('Failed to update album.');
    }
  };

  const renderAlbumOptions = (): JSX.Element[] => {
    return albumsData?.map?.((album) => (
      <option key={album.id} value={album.id}>
        {album.name}
      </option>
    ));
  };

  useEffect(() => {
    if (musicData) {
      reset({
        name: musicData.name,
        albumId: musicData.albumId,
      });
    }
  }, [musicData]);

  return (
    <div className={styles.addArtist}>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <label>Music Name</label>
          <input
            {...register('name', { maxLength: 32 })}
            className={styles.smallInput}
            placeholder="Exp: DAMN."
          />
        </div>
        <div className={styles.chooseArtist}>
          <label>Choose Album</label>
          <select
            {...register('albumId', { required: true })}
            className={styles.select}
          >
            <option value="">Select an album</option>
            {renderAlbumOptions()}
          </select>
        </div>
        <div className={styles.inputs}>
          <label>Upload Album Cover</label>
          <input type="file" {...register('src')} className={styles.bigInput} />
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
