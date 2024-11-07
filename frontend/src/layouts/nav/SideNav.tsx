'use client'
import {  useColorModeValue } from '@/components/ui/color-mode';
import { useDisclosure, Box, Drawer, DrawerContent, BoxProps, Flex, IconButton, FlexProps, Text } from '@chakra-ui/react';
import { NavItem } from './NavItem';
import { RiAlignJustify } from 'react-icons/ri';

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.800')}
    border="1px"
    borderRightColor={useColorModeValue('gray.100', 'gray.200')}
    w={{ base: 'full', md: 60 }}
    pos={{ base: 'absolute', md: 'fixed' }}
    top={0}
    left={0}
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        GitHub Talent
      </Text>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <RiAlignJustify />
      </IconButton>
    </Flex>
    <NavItem />
  </Box>
);

interface MobileNavProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileNavProps) => (
  <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 24 }}
    height="20"
    alignItems="center"
    bg={useColorModeValue('white', 'gray.800')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.100', 'gray.200')}
    justifyContent="flex-start"
    {...rest}
  >
    <IconButton
      variant="outline"
      onClick={onOpen}
      aria-label="Open menu"
    >
      <RiAlignJustify />
    </IconButton>
    <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
      GitHub Talent
    </Text>
  </Flex>
);

interface SidebarProps {
  children: React.ReactNode;
}

export function SimpleSidebar({children}: SidebarProps) {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} borderRightColor={useColorModeValue('white', 'white')} >
      <SidebarContent display={{ base: 'none', md: 'block' }} onClose={onClose} />

      <Drawer.Root open={isOpen} placement="top" size="full" onPointerDownOutside={onClose}>
        <DrawerContent>
          <SidebarContent onClose={onClose} />          
        </DrawerContent>
      </Drawer.Root>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      <Box as="main" ml={{ base: 0, md: 60 }} p="4" overflow="hidden">
        { children }
      </Box>
    </Box>
  );
}
