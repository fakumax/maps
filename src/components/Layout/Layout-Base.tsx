import Navbar from '../Navbar/Navbar';
import FontHeader from './FontHeader';
//import { Container, Stack, HStack, VStack } from '@chakra-ui/react';
import { Grid, GridItem, Box, Flex, Center, Container } from '@chakra-ui/react';

import Sidebar from '@components/Sidebar/Sidebar';
const LayoutBase = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        <Flex>
          <Box w="20%">
            <Sidebar />
          </Box>
          <Box flex="1">{children}</Box>
        </Flex>
      </main>
    </>
  );
};

export default LayoutBase;
