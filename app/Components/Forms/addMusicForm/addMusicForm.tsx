'use client';
// import Link from 'next/link';
import axios from 'axios';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addMusicForm.module.scss';

const AddMusicForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values: object): Promise<void> => {
    'name';
    'uploadAlbumCover';
    'description';

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
    <div className={styles.addArtist}>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <label>Music Name</label>
          <input
            {...register('name', {
              required: true,
              maxLength: 16,
            })}
            className={styles.smallInput}
            placeholder="EXP: Dagdagani-yofierebis autaneli sidzulvili"
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="">Upload Music File</label>
          <input
            type="file"
            {...register('uploadAlbumCover', {
              required: true,
            })}
            className={styles.bigInput}
            placeholder="upload song"
          />
        </div>
        <div className={styles.inputs}>
          <label>Music Description</label>
          <input
            {...register('name', {
              required: true,
              maxLength: 16,
            })}
            className={styles.smallInput}
            placeholder="Description"
          />
        </div>

        <Button
          className={styles.uploadButton}
          type={ButtonTypeEnum.Primary}
          htmlType={'submit'}
          href={'/uploaded'}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default AddMusicForm;
