'use client';
import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';
import styles from './page.module.scss';
import { MusicInterface } from '@/app/(authorized)/albums/interfaces/music.interface';
import Button from '@/app/Components/Button/Button';
import { ButtonTypeEnum } from '@/app/Components/Button/enums/button-type.enum';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';
import { getCookie } from '@/helpers/cookies';

const AddAlbumForm = (props: { params: { id: number } }): JSX.Element => {
  const { register, handleSubmit, reset } = useForm();
  const { data: musicData, error } = useSWR<MusicInterface>(
    `/musics/${props.params.id}`,
    fetcher,
  );
  const { data: albumsData } = useSWR('/albums', fetcher);
  console.log(musicData, props.params.id, 'id');

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();

    data.append('name', values.name);
    data.append('albumId', values.albumId);
    data.append('file', values.src[0]);

    const token: string | null = getCookie('accessToken');

    const response: AxiosResponse = async () => {
      try {
        await ApiClient.put(
          `https://back.dnck.ge/musics/${props.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        message.success('Album updated successfully!');
      } catch (error) {
        message.error('Failed to update album.', response.data);
      }
    };
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
        albumId: musicData.id,
        description: musicData.history,
      });
    }
  }, [musicData]);

  console.log(musicData, error, musicData?.id);

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
