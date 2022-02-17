import type { NextPage } from 'next';
import Navbar from '../components/Navbar/Navbar';
import Layout from '../components/Layout/Layout-Base';

const Test: NextPage = () => {
  return (
    <>
      <div>wara</div>
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
