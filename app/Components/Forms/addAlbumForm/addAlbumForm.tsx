'use client';
import axios, { AxiosResponse } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addAlbumForm.module.scss';
import { getCookie } from '@/helpers/cookies'; // Adjust import if necessary

const AddAlbumForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const router: AppRouterInstance = useRouter();

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();

    data.append('name', values.name);
    data.append('releaseDate', values.releaseDate);
    data.append('file', values.file[0]);

    const token: string | null = getCookie('accessToken');

    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const response: AxiosResponse = await axios.post(
        'https://back.dnck.ge/albums',
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
            {...register('name', { maxLength: 32 })}
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
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className={styles.inputs}>
          <label>Upload Album Cover</label>
          <input
            type="file"
            {...register('file', { required: true })}
            className={styles.bigInput}
          />
        </div>
        <Button
          className={styles.uploadButton}
          htmlType="submit"
          type={ButtonTypeEnum.Primary}
          href="/uploaded"
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default AddAlbumForm;
