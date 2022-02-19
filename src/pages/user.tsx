import React, { useRef, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import MapBox from '../components/mapbox/mapbox';
import MapBox from '../components/Map/MapV2';

import { Container, Box } from '@chakra-ui/react';
import ToolbarMenu from '../components/Toolbar/ToolbarMenu';
import type { ReactElement } from 'react';
import Layout from '../components/Layout/Layout-User';

const User: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <meta name="description" content="MapBox App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MapBox />
    </>
  );
};

export default User;

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
