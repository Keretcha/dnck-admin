'use client';
import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import Errors from '../../Errors/Errors';
import styles from './addArtistForm.module.scss';
import { getCookie } from '@/helpers/cookies';

const AddArtistForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router: AppRouterInstance = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
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
      console.error('Submission Error:', err);
    }
  };

  return (
    <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <label>First Name</label>
        <input
          {...register('firstName', { required: true })}
          className={styles.smallInput}
          placeholder="EXP: Gela Gnolidze"
        />
        {errors.firstName && <Errors title="First Name is required." />}
      </div>
      <div className={styles.inputs}>
        <label>Last Name</label>
        <input
          {...register('lastName', { required: true })}
          className={styles.smallInput}
          placeholder="EXP: Gela Gnolidze"
        />
        {errors.lastName && <Errors title="Last Name is required." />}
      </div>
      <div className={styles.inputs}>
        <label>Artist Bio</label>
        <input
          {...register('biography', { required: true })}
          className={styles.smallInput}
          placeholder="About Artist..."
        />
        {errors.biography && <Errors title="Artist Bio is required." />}
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
          Select Image
          <span className={styles.colored}> file or drop music file here.</span>
        </label>
        {errors.file && <Errors title="File is required." />}
      </div>
      <div>
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
