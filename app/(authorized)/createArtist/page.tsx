import styles from './page.module.scss';
import AddArtistForm from '@/app/Components/Forms/addArtistForm/AddArtistForm';
import Heading from '@/app/Components/Heading/Heading';
import { HeadingTypeEnum } from '@/app/Components/Heading/enums/heading-type.enum';

export default function Home(): JSX.Element {
  return (
    <div className={styles.content}>
      <div className={styles.forms}>
        <Heading type={HeadingTypeEnum.H2}>Add New Artist</Heading>
      </div>
      <div className={styles.form}>
        <AddArtistForm />
      </div>
    </div>
  );
}
