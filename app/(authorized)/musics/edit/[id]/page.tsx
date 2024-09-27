'use client';
import { message } from 'antd';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';
import styles from './page.module.scss';
import { AlbumInterface } from '@/app/(authorized)/albums/interfaces/albums.interfaces';
import { MusicInterface } from '@/app/(authorized)/albums/interfaces/music.interface';
import Button from '@/app/Components/Button/Button';
import { ButtonTypeEnum } from '@/app/Components/Button/enums/button-type.enum';
import { ApiClient } from '@/app/api/api';
import { fetcher } from '@/app/api/fetcher';
import { getCookie } from '@/helpers/cookies';

const AddAlbumForm = (props: { params: { id: number } }): JSX.Element => {
  const { register, handleSubmit, reset } = useForm();
  const { data: musicData } = useSWR<MusicInterface>(
    `/musics/${props.params.id}`,
    fetcher,
  );
  const { data: albumsData } = useSWR<AlbumInterface[]>('/albums', fetcher);

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();

    data.append('name', values.name);
    data.append('albumId', values.albumId);

    if (values.src && values.src.length > 0) {
      data.append('file', values.src[0]);
    }

    const token: string | null = getCookie('accessToken');

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
      message.success('Music updated successfully!');
    } catch (error) {
      message.error('Failed to update music. Please try again.');
      console.error('Error details:');
    }
  };

  const renderAlbumOptions = (): JSX.Element[] => {
    return (
      albumsData?.map((props: AlbumInterface) => (
        <option key={props.id} value={props.id}>
          {props.name}
        </option>
      )) || []
    );
  };

  useEffect(() => {
    if (musicData) {
      reset({
        name: musicData.name,
        albumId: musicData.album.id,
        description: musicData.history,
      });
    }
  }, [musicData, reset]);

  return (
    <div className={styles.addArtist}>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <label>Music Name</label>
          <input
            {...register('name', { maxLength: 32, required: false })}
            className={styles.smallInput}
            placeholder="Exp: DAMN."
          />
        </div>
        <div className={styles.chooseArtist}>
          <label>Choose Album</label>
          <select
            {...register('albumId', { required: false })}
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
