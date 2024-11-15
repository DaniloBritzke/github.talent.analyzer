import React from 'react';
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';

export interface AppProps {
  children: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  return (
    <Box w="100vw" h="100vh" maxH="100vh" overflow="hidden" bg={useColorModeValue('white', 'gray.700')}>
      {children}
    </Box>
  );
};

export default App;
