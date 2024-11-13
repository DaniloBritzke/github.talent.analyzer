import { Box, Flex } from '@chakra-ui/react';
import { SimpleSidebar } from '../layouts';
import { ScheduleForm } from '@/layouts/import';

export default function ImportPage() {
  return (
    <Box height="100vh" overflow="hidden">
      <Flex
        flex="1"
        direction="column"
        overflow="hidden"
      >
        <SimpleSidebar>
          <Box
            overflowY="auto" 
            flex="1"
            mt="8"
            height="calc(100vh - 64px)" 
          >
            <ScheduleForm />
          </Box>
        </SimpleSidebar>
      </Flex>
    </Box>
  );
}
