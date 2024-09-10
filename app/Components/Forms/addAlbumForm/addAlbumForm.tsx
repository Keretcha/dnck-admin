'use client';
import axios from 'axios';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addAlbumForm.module.scss';

const AddAlbumForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values: object): Promise<void> => {
    'firsName';
    'lastName';
    'releaseDate';
    'file';

    console.log(values);
    try {
      await axios.post('http://10.10.51.20:3000/artist', values);
      console.log(values);
      router.push('/uploaded');
    } catch (err) {
      console.error('Can not load this page', err);
    }
  };
  return (
    <div className={styles.addArtist}>
      <form className={styles.forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <label>Album Name</label>
          <input
            {...register('name', {
              // required: true,
              maxLength: 16,
            })}
            className={styles.smallInput}
            placeholder="Exp: DAMN."
          />
        </div>
        <div className={styles.inputs}>
          <label>Release Date</label>
          <input
            type="date"
            {...register('releaseDate', {
              // required: true,
            })}
            className={styles.smallInput}
            placeholder="DD/MM/YYYY (day,month,year)"
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="">Upload Album Cover</label>
          <input
            {...register('file', {
              required: true,
            })}
            className={styles.bigInput}
            placeholder="upload song"
          />
        </div>

        <Button
          className={styles.uploadButton}
          htmlType={'submit'}
          type={ButtonTypeEnum.Primary}
          href={'/uploaded'}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default AddAlbumForm;
