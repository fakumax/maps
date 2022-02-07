import React, { useRef, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import MapBox from '../components/mapbox/mapbox';
import { Container, Box } from '@chakra-ui/react';
import ToolbarMenu from '../components/Toolbar/ToolbarMenu';

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <meta name="description" content="MapBox App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt={8}>
        <ToolbarMenu />
      </Box>
      <main className={styles.main}>
        <MapBox />
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by Enérgica City
        </a>
      </footer>
    </Container>
  );
};

export default Home;
