import AddAdminForm from '../Components/Forms/addArtistForm/addArtistForm';
import Heading from '../Components/Heading/Heading';
import { HeadingTypeEnum } from '../Components/Heading/enums/heading-type.enum';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.forms}>
          <Heading type={HeadingTypeEnum.H2}>Add New Artist</Heading>
        </div>
        <div>
          <AddAdminForm />
        </div>
      </div>
    </div>
  );
}
