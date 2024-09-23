'use client';

import axios, { AxiosResponse } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addAlbumForm.module.scss';
import { getCookie } from '@/helpers/cookies';
import { AddAlbumFormProps } from './interfaces/chooseArtist.interface';
import { ArtistInterface } from '@/app/(authorized)/albums/interfaces/artist.interfaces';
import { fetcher } from '@/app/api/fetcher';
import useSWR from 'swr';

const AddAlbumForm: React.FC<AddAlbumFormProps> = ({ albumId }) => {
  const { register, handleSubmit } = useForm();
  const router: AppRouterInstance = useRouter();
  const { data: artists, error } = useSWR<ArtistInterface[]>(
    '/artists',
    fetcher,
  );

  if (error) return <div>Error loading artists.</div>;
  if (!artists) return <div>Loading...</div>;

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();

    data.append('name', values.name);
    data.append('artistId', values.artistId);
    data.append('releaseDate', values.releaseDate);
    if (values.file && values.file[0]) {
      data.append('file', values.file[0]);
    }

    const token: string | null = getCookie('accessToken');

    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const url = albumId
        ? `https://back.dnck.ge/albums/${albumId}`
        : 'https://back.dnck.ge/albums';

      const response: AxiosResponse = await axios[albumId ? 'put' : 'post'](
        url,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);

      router.push('/uploaded/albumUploaded');
    } catch (err) {
      console.error('Failed to upload album', err);
    }
  };

  return (
    <div className={styles.addArtist}>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <label>Album Name</label>
          <input
            {...register('name', { maxLength: 32, required: true })}
            className={styles.smallInput}
            placeholder="Exp: DAMN."
          />
        </div>
        <div className={styles.inputs}>
          <label>Release Date</label>
          <input
            type="date"
            {...register('releaseDate', { required: true })}
            className={styles.smallInput}
          />
        </div>
        <div className={styles.chooseArtist}>
          <label>Choose Artist</label>
          <select
            {...register('artistId', { required: true })}
            className={styles.select}
          >
            <option value="">Select an artist</option>
            {artists.map((artist) => (
              <option
                className={styles.option}
                key={artist.id}
                value={artist.id}
              >
                {artist.firstName} {artist.lastName}
              </option>
            ))}
          </select>
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
