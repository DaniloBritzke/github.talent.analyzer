import { Box, Flex } from '@chakra-ui/react';
import { SimpleSidebar } from '../layouts';
import { SkeletonText } from '../components/ui/skeleton';

export default function HomePage() {
  return (
    <Box>
      <Flex flex="1" minHeight="100vh" width="100vw" direction="column">
        <SimpleSidebar >
          <Box flex="1" p="8" overflow="hidden" mt={{ base: 'auto', md: '0' }}>
            <h1>Bem Vindo ao GitHub Talent Analyzer</h1>
            <p>This is the main content area.</p>
            <SkeletonText />
          </Box>
        </SimpleSidebar>
      </Flex>
    </Box>
  );
};
