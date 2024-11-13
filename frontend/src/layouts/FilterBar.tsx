import { useColorModeValue } from '@/components/ui/color-mode';
import { Button, Flex, Box } from '@chakra-ui/react';
import { HiOutlineRefresh } from 'react-icons/hi';

interface FilterContainerProps {
  children: React.ReactNode;
  onReset: () => void;
}

export const FilterContainer: React.FC<FilterContainerProps> = ({ children, onReset }) => {
  return (
    <Box
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={useColorModeValue('white', 'gray.600')}
      w="full"
      boxShadow="sm"
      borderWidth="1px"
      borderRadius="lg"
      mb={6}
      p={4}
      
    >
      <Flex justify="space-between" align="center" wrap="wrap">
        <Box  mr={4}>
          {children}
        </Box>

        {/* Reset button */}
        <Button borderWidth="1px" borderRadius="lg" variant="outline" onClick={onReset}>
          <HiOutlineRefresh  fontSize="inherit" />
          Atualizar
        </Button>
      </Flex>
    </Box>
  );
};
