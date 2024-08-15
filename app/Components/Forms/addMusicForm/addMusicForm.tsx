'use client';
// import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addMusicForm.module.scss';

const AddMusicForm = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  // const onSubmit = () => {
  //   axios.post(`/register`, {
  //     name,
  //     song,
  //     album,
  //     bio,
  //   });
  // };

  const onSubmit = (values: object): void => {
    'name';
    'song';
    'album';
    'bio';
    console.log(values);
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
