'use client';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { ButtonTypeEnum } from '../../Button/enums/button-type.enum';
import styles from './addArtistForm.module.scss';

const AddAdminForm = (): JSX.Element => {
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
          <label>Name</label>
          <input
            {...register('name', {
              required: true,
              maxLength: 16,
            })}
            className={styles.smallInput}
            placeholder="EXP: Gela Gnolidze"
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="">Upload Song</label>
          <input
            type="file"
            {...register('uploadSong', {
              required: true,
            })}
            className={styles.bigInput}
            placeholder="upload song"
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="">Upload Album</label>
          <input
            type="file"
            {...(register('uploadSong'),
            {
              required: true,
            })}
            className={styles.bigInput}
            placeholder="upload song"
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="">Artist Bio</label>
          <input
            {...register('name', {
              required: true,
              minLength: 9,
            })}
            className={styles.smallInput}
            placeholder="About Artist..."
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

export default AddAdminForm;
