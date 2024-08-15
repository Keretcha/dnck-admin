import AddAlbumForm from '../Components/Forms/addAlbumForm/addAlbumForm';
import Heading from '../Components/Heading/Heading';
import { HeadingTypeEnum } from '../Components/Heading/enums/heading-type.enum';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.forms}>
          <Heading type={HeadingTypeEnum.H2}>Add New Album</Heading>
        </div>
        <div>
          <AddAlbumForm />
        </div>
      </div>
    </div>
  );
}
