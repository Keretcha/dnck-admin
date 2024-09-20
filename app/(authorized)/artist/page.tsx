'use client';

// import axios, { AxiosResponse } from 'axios';
// import router from 'next/router';
// import { useState, useEffect } from 'react';
// import useSWR from 'swr';
// import { AlbumInterface } from '../albums/interfaces/albums.interfaces';
import styles from './artist.module.scss';
// import { AlbumCardItemsInterface } from '@/app/Components/AlbumCard/interfaces/album-card-items.interface';
import Heading from '@/app/Components/Heading/Heading';
import { HeadingTypeEnum } from '@/app/Components/Heading/enums/heading-type.enum';
import ArtistControlTable from '@/app/Components/Tables/artists/artistControl';
import Text from '@/app/Components/Text/Text';
import { TextHtmlTypeEnum } from '@/app/Components/Text/enums/text-html-type.enum';
import { TextTypeEnum } from '@/app/Components/Text/enums/text-type.enum';
// import { fetcher } from '@/app/api/fetcher';

export default function Artist(): JSX.Element {
  // const { data: artists } = useSWR<AlbumInterface[]>(`/artist`, fetcher);

  //   return (
  //     <div>
  //       {albums && (
  //         <AlbumCards
  //           items={albums?.map?.((album) => {
  //             return {
  //               title: album.name,
  //               imgUrl: album.imgUrl,
  //               artists: album.artists,
  //               dropDownItems: [],
  //             };
  //           })}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Heading type={HeadingTypeEnum.H3}>Added Artists</Heading>
        <Text
          htmlType={TextHtmlTypeEnum.Span}
          type={TextTypeEnum.SecondaryTextSmall}
          className={styles.headerText}
        >
          90 Artist
        </Text>
      </div>
      <div>
        <ArtistControlTable />
      </div>
    </div>
  );
}
