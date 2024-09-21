'use client';
// import Link from 'next/link';
import axios from 'axios';
import router from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addMusicForm.module.scss';
import { getCookie } from '@/helpers/cookies';

const AddMusicForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors, 'erer');

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const data: FormData = new FormData();

    data.append('name', values.name);
    data.append('music', values.music[0]);
    data.append('description', values.description[0]);

    console.log(getCookie('accessToken'), 'access');

    try {
      await axios.post('https://back.dnck.ge/musics', data, {
        headers: {
          Authorization: 'Bearer ' + getCookie('accessToken'),
        },
      });
      router.push('/uploaded/musicUploaded');
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
              // required: true,
              maxLength: 666,
            })}
            className={styles.smallInput}
            placeholder="EXP: Dagdagani-yofierebis autaneli sidzulvili"
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="">Upload Music File</label>
          <input
            type="file"
            {...register('music', {
              // required: true,
            })}
            className={styles.bigInput}
            placeholder="upload song"
          />
        </div>
        <div className={styles.inputs}>
          <label>Music Description</label>
          <input
            {...register('description', {
              // required: true,
              maxLength: 666,
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
