import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Google from '../src/components/googlemap';
const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.grid}>
        <button type="button" onClick={() => router.push('/google')}>
          Google Map
        </button>
        <button type="button" onClick={() => router.push('/mapbox')}>
          MapBox
        </button>

        <button type="button" onClick={() => router.push('/google')}>
          Google Map
        </button>
      </nav>
      <main className={styles.main}>
        <Google />
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by Enérgica City
        </a>
      </footer>
    </div>
  );
};

export default Home;