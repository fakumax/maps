import React, { useRef, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import MapBox from '../src/components/mapbox/mapbox';
import { Container } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <meta name="description" content="MapBox App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
