import type { NextPage } from 'next';
import Navbar from '@components/Navbar/Navbar';
import Layout from '@components/Layout/Layout-Base';
import MapBox from '@components/Map/MapV2';

import { HStack, Box } from '@chakra-ui/react';
const Fertilizacion: NextPage = () => {
  return (
    <>
      <Box flex>
        <HStack width={400} height={400} pb={2}>
          <MapBox />
        </HStack>
        <HStack width={400} height={400}>
          <MapBox />
        </HStack>
      </Box>
    </>
  );
};

export default Fertilizacion;

Fertilizacion.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
