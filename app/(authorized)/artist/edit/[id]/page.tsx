'use client';
import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';
import styles from './page.module.scss';
import { ArtistInterface } from '@/app/(authorized)/albums/interfaces/artist.interfaces';
import Button from '@/app/Components/Button/Button';
import { ButtonTypeEnum } from '@/app/Components/Button/enums/button-type.enum';
import { fetcher } from '@/app/api/fetcher';
import { getCookie } from '@/helpers/cookies';

const AddArtistForm = (props: { params: { id: number } }): JSX.Element => {
  const { register, handleSubmit, reset } = useForm();
  const { data } = useSWR<ArtistInterface>(
    `/artists/${props.params.id}`,
    fetcher,
  );
  const router: AppRouterInstance = useRouter();

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const formData: FormData = new FormData();

    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('biography', values.biography);

    if (values.file && values.file.length > 0) {
      formData.append('file', values.file[0]);
    }

    const token: string | null = getCookie('accessToken');

    try {
      await axios.put(
        `https://back.dnck.ge/artists/${props.params.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      router.push('/artist');
    } catch (error) {
      console.error('Error updating artist:', error);
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        biography: data.biography,
        file: data?.history?.location,
      });
    }
  }, [data, reset]);

  return (
    <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <label>Name</label>
        <input
          {...register('firstName', { minLength: 2, required: true })}
          className={styles.smallInput}
          placeholder="EXP: Gela Gnolidze"
        />
      </div>
      <div className={styles.inputs}>
        <label>Last Name</label>
        <input
          {...register('lastName', { maxLength: 16, required: true })}
          className={styles.smallInput}
          placeholder="EXP: Gela Gnolidze"
        />
      </div>
      <div className={styles.inputs}>
        <label htmlFor="">Artist Bio</label>
        <input
          {...register('biography', { minLength: 9, required: true })}
          className={styles.smallInput}
          placeholder="About Artist..."
        />
      </div>
      <div className={styles.customFileUpload}>
        <label className={styles.customLabel} htmlFor="file-upload">
          Artist Image
        </label>
        <input
          type="file"
          {...register('file')}
          id="file-upload"
          className={styles.fileInput}
        />
        <label htmlFor="file-upload" className={styles.fileLabel}>
          Select music
          <span className={styles.colored}>file or drop music file here.</span>
        </label>
      </div>
      <div className={styles.button}>
        <Button
          className={styles.uploadButton}
          type={ButtonTypeEnum.Primary}
          htmlType={'submit'}
        >
          Upload
        </Button>
      </div>
    </form>
  );
};

export default AddArtistForm;
