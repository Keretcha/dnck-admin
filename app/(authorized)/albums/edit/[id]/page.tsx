'use client';
import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { AlbumInterface } from '../../interfaces/albums.interfaces';
import styles from './page.module.scss';
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

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();

    data.append('name', values.name);
    data.append('releaseDate', values.releaseDate);
    data.append('file', values.file[0]);

    const token: string | null = getCookie('accessToken');

    const response: AxiosResponse = async () => {
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
      } catch {
        console.log(response.data);
      }
    };
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        releaseDate: data.releaseDate,
      });
    }
  }, [data]);

  return (
    <div className={styles.addArtist}>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <label>Album Name</label>
          <input
            {...register('name', { maxLength: 32 })}
            className={styles.smallInput}
            placeholder="Exp: DAMN."
          />
        </div>
        <div className={styles.inputs}>
          <label>Release Date</label>
          <input
            type="date"
            {...register('releaseDate')}
            className={styles.smallInput}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className={styles.inputs}>
          <label>Upload Album Cover</label>
          <input
            type="file"
            {...register('file')}
            className={styles.bigInput}
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
