'use client';
import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addArtistForm.module.scss';

const AddArtistForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const router: AppRouterInstance = useRouter();

  const onSubmit = async (values: object): Promise<void> => {
    'firsName';
    'lastName';
    'biography';
    console.log(values);
    try {
      await axios.post('http://10.10.51.20:3000/artists', values);
      console.log();
      router.push('/uploaded');
    } catch (err) {
      console.error('Can not load this page', err);
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
            required: true,
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
