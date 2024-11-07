import React from 'react';
import { Box } from '@chakra-ui/react';

export interface AppProps {
  children: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  return (
    <Box w="100vw" h="100vh" maxH="100vh" overflow="hidden">
      {children}
    </Box>
  );
};

export default App;
