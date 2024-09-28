'use client';
import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addArtistForm.module.scss';
import { getCookie } from '@/helpers/cookies';

const AddArtistForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const router: AppRouterInstance = useRouter();

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();

    data.append('firstName', values.firstName);
    data.append('lastName', values.lastName);
    data.append('biography', values.biography);
    data.append('file', values.file[0]);

    try {
      await axios.post('https://back.dnck.ge/artists', data, {
        headers: {
          Authorization: 'Bearer ' + getCookie('accessToken'),
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/uploaded/artistUploaded');
    } catch (err) {
      console.error('Cannot load this page', err);
    }
  };

  return (
    <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <label>Name</label>
        <input
          {...register('firstName', {
            required: true,
            minLength: 2,
          })}
          className={styles.smallInput}
          placeholder="EXP: Gela Gnolidze"
        />
      </div>
      <div className={styles.inputs}>
        <label>Last Name</label>
        <input
          {...register('lastName', {
            maxLength: 16,
          })}
          className={styles.smallInput}
          placeholder="EXP: Gela Gnolidze"
        />
      </div>
      <div className={styles.inputs}>
        <label htmlFor="">Artist Bio</label>
        <input
          {...register('biography', {
            required: true,
            minLength: 9,
          })}
          className={styles.smallInput}
          placeholder="About Artist..."
        />
      </div>
      <div className={styles.customFileUpload}>
        <label htmlFor="file-upload">Select Artist Image</label>
        <input
          type="file"
          {...register('file', { required: true })}
          id="file-upload"
          className={styles.fileInput}
        />
        <label htmlFor="file-upload" className={styles.fileLabel}>
          Select music
          <span className={styles.colored}> file or drop music file here.</span>
        </label>
      </div>
      <div>
        <Button
          className={styles.uploadButton}
          type={ButtonTypeEnum.Primary}
          htmlType={'submit'}
          href={'/uploaded'}
        >
          Upload
        </Button>
      </div>
    </form>
  );
};

export default AddArtistForm;
