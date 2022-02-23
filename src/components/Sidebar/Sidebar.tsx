import React from 'react';
import styles from '@styles/Sidebar/Sidebar.module.scss';
import { Container, Box, HStack, Center } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Box h="100%">
      <HStack>
        <Center>
          <div>Capas</div>
        </Center>
      </HStack>
    </Box>
  );
};

export default Sidebar;
