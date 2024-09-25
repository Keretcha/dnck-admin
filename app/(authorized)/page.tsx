'use client';

import useSWR from 'swr';
import AlbumCards from '../Components/AlbumCards/AlbumCards';
import ContentHeading from '../Components/ContentHeading/ContentHeading';
import HitsCards from '../Components/HitsCards/HitsCards';
import { fetcher } from '../api/fetcher';
import { AlbumInterface } from './albums/interfaces/albums.interfaces';
import { MusicInterface } from './albums/interfaces/music.interface';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
  const { data: albums } = useSWR<AlbumInterface[]>('/albums', fetcher);
  const { data: musics } = useSWR<MusicInterface[]>('/musics', fetcher);

  return (
    <div className="container">
      <div className={styles.pageContent}>
        <div className={styles.sections}>
          <div className={styles.content}>
            <div className={styles.cards}>
              <ContentHeading href={'/artists'}>
                Recently Added Artists
              </ContentHeading>
              <div className={styles.cards}>
                {musics && (
                  <HitsCards
                    items={musics.slice(0, 100).map((hit) => {
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
              <ContentHeading href={'/albums'}>
                Recently Added Albums
              </ContentHeading>
              <div className={styles.albumCards}>
                {albums && (
                  <AlbumCards
                    items={albums.slice(0, 100).map((album) => ({
                      title: album.name,
                      imgUrl: album.history?.location,
                      artists: album.artists,
                      dropDownItems: [],
                      id: album.id,
                    }))}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <ContentHeading href={'/artists'}>
              Recently Added Artists
            </ContentHeading>
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
        </div>
      </div>
    </div>
  );
}
