'use client';
// import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addAlbumForm.module.scss';

const AddAlbumForm = (): JSX.Element => {
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
          <label>Album Name</label>
          <input
            {...register('name', {
              required: true,
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
            {...register('date', {
              required: true,
            })}
            className={styles.smallInput}
            placeholder="DD/MM/YYYY (day,month,year)"
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="">Upload Album Cover</label>
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
          <label htmlFor="">Upload Songs</label>
          <input
            type="file"
            {...register('uploadSong', {
              required: true,
            })}
            className={styles.bigInput}
            placeholder="upload song"
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

export default AddAlbumForm;
