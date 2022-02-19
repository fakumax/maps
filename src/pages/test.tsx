import type { NextPage } from 'next';
import Navbar from '@components/Navbar/Navbar';
import Layout from '@components/Layout/Layout-Base';
import MapBox from '@components/Map/MapV2';

const Test: NextPage = () => {
  return (
    <>
      <MapBox />
    </>
  );
};

export default Test;

Test.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
