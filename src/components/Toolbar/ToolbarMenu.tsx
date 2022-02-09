import React from 'react';
import { Button, ButtonGroup, Flex, Spacer, Box } from '@chakra-ui/react';

const ToolbarMenu = () => {
  return (
    <>
      <ButtonGroup variant="outline" spacing="6">
        <Button colorScheme="blue">Polígono</Button>
        <Button colorScheme="red">Distancia</Button>
        <Button colorScheme="green">Marcador</Button>
      </ButtonGroup>
    </>
  );
};

export default ToolbarMenu;
