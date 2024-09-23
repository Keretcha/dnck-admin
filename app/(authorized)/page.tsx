'use client';

import useSWR from 'swr';
import AlbumCards from '../Components/AlbumCards/AlbumCards';
import ContentHeading from '../Components/ContentHeading/ContentHeading';
import HitsCards from '../Components/HitsCards/HitsCards';
import { fetcher } from '../api/fetcher';
import { AlbumInterface } from './albums/interfaces/albums.interfaces';
import { MusicInterface } from './albums/interfaces/track.interface';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
  const { data: albums } = useSWR<AlbumInterface[]>('/albums', fetcher);
  const { data: musics } = useSWR<MusicInterface[]>('/musics', fetcher);

  return (
    <div className="container">
      <div className={styles.pageContent}>
        <div className={styles.sections}>
          <div className={styles.content}>
            <ContentHeading>Recently Added Artists</ContentHeading>
            <div className={styles.cards}>
              {musics && (
                <HitsCards
                  items={musics.slice(0, 9).map((hit) => {
                    return {
                      backgroundImage: hit?.album?.history?.location,
                      album: hit.album,
                      name: hit.name,
                      src: hit.history.location,
                      id: hit.id,
                      dropDownItems: [],
                    };
                  })}
                />
              )}
            </div>
          </div>
          <div className={styles.content}>
            <ContentHeading>Recently Added Albums</ContentHeading>
            <div className={styles.cards}>
              {albums && (
                <AlbumCards
                  items={albums.slice(0, 4).map?.((album) => {
                    console.log(album, 'albums');
                    return {
                      title: album?.name,
                      imgUrl: album.history.location,
                      artists: album?.artists,
                      dropDownItems: [],
                    };
                  })}
                />
              )}
            </div>
          </div>
          <div className={styles.content}>
            <ContentHeading>Recently Added Artists</ContentHeading>
            <div className={styles.cards}>
              {musics && (
                <HitsCards
                  items={musics.slice(0, 9).map((hit) => {
                    console.log(hit?.album?.history?.location, 'loccaa');
                    return {
                      backgroundImage: hit?.album?.history?.location,
                      album: hit.album,
                      name: hit.name,
                      src: hit.history.location,
                      id: hit.id,
                      dropDownItems: [],
                    };
                  })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default MainPage;
