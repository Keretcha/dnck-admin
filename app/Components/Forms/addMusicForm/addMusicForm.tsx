'use client';
import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addMusicForm.module.scss';
import { AlbumInterface } from '@/app/(authorized)/albums/interfaces/albums.interfaces';
import { fetcher } from '@/app/api/fetcher';
import { getCookie } from '@/helpers/cookies';

const AddMusicForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const router: AppRouterInstance = useRouter();
  const { data: albums, error } = useSWR<AlbumInterface[]>('/albums', fetcher);

  const handleLoadingState = (): JSX.Element | null => {
    if (error) return <div>Error loading albums.</div>;
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

  const renderAlbumOptions = (): JSX.Element[] | undefined => {
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
              {...register('name', { maxLength: 666, required: true })}
              className={styles.smallInput}
              placeholder="EXP: Dagdagani-yofierebis autaneli sidzulvili"
            />
          </div>
          <div className={styles.inputs}>
            <label>Upload Music File</label>
            <div className={styles.customFileUpload}>
              <input
                type="file"
                {...register('src', { required: true })}
                id="file-upload"
                className={styles.fileInput}
              />
              <label htmlFor="file-upload" className={styles.fileLabel}>
                Select music
                <span className={styles.colored}>
                  file or drop music file here.
                </span>
              </label>
            </div>
          </div>
          <div className={styles.chooseArtist}>
            <label>Choose Album</label>
            <select
              {...register('albumId', { required: true })}
              className={styles.select}
            >
              <option value="">Select an Album</option>
              {renderAlbumOptions()}
            </select>
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
