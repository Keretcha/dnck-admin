import AddMusicForm from '../../Components/Forms/addMusicForm/addMusicForm';
import Heading from '../../Components/Heading/Heading';
import { HeadingTypeEnum } from '../../Components/Heading/enums/heading-type.enum';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.forms}>
          <Heading type={HeadingTypeEnum.H2}>Add New Music</Heading>
        </div>
        <div>
          <AddMusicForm />
        </div>
      </div>
    </div>
  );
}
