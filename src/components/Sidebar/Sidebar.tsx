import React from 'react';
import styles from '@styles/Sidebar/Sidebar.module.scss';
import { Container } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Container color="red.400" bg="tomato">
      <div>Sidebar</div>
    </Container>
  );
};

export default Sidebar;
