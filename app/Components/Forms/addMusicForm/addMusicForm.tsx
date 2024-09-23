'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addMusicForm.module.scss';
import { getCookie } from '@/helpers/cookies';
import { fetcher } from '@/app/api/fetcher';
import useSWR from 'swr';
import { AlbumInterface } from '@/app/(authorized)/albums/interfaces/albums.interfaces';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const AddMusicForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router: AppRouterInstance = useRouter();
  const { data: albums, error } = useSWR<AlbumInterface[]>('/albums', fetcher);

  const handleLoadingState = () => {
    if (error) return <div>Error loading artists.</div>;
    if (!albums) return <div>Loading...</div>;
    return null;
  };

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();

    data.append('name', values.name);
    data.append('src', values.src[0]);
    data.append('albumId', values.albumId);
    data.append('description', values.description);

    try {
      await axios.post('https://back.dnck.ge/musics', data, {
        headers: {
          Authorization: 'Bearer ' + getCookie('accessToken'),
        },
      });
      router.push('/uploaded/musicUploaded');
    } catch (err) {
      console.error('Unable to upload music', err);
    }
  };

  const renderArtistOptions = () => {
    return albums?.map((album) => (
      <option key={album.id} value={album.id}>
        {album.name}
      </option>
    ));
  };

  return (
    <div className={styles.addArtist}>
      {handleLoadingState()}
      {albums && (
        <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputs}>
            <label>Music Name</label>
            <input
              {...register('name', { maxLength: 666 })}
              className={styles.smallInput}
              placeholder="EXP: Dagdagani-yofierebis autaneli sidzulvili"
            />
          </div>
          <div className={styles.inputs}>
            <label>Upload Music File</label>
            <input
              type="file"
              {...register('src')}
              className={styles.bigInput}
              placeholder="upload song"
            />
          </div>
          <div className={styles.chooseArtist}>
            <label>Choose Artist</label>
            <select
              {...register('albumId', { required: true })}
              className={styles.select}
            >
              <option value="">Select an artist</option>
              {renderArtistOptions()}
            </select>
          </div>
          <div className={styles.inputs}>
            <label>Music Description</label>
            <input
              {...register('description', { maxLength: 666 })}
              className={styles.smallInput}
              placeholder="Description"
            />
          </div>

          <Button
            className={styles.uploadButton}
            type={ButtonTypeEnum.Primary}
            htmlType="submit"
          >
            Upload
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddMusicForm;
