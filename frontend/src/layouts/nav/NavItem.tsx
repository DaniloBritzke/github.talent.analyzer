import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass } from 'react-icons/fi'; 

const navItems = [
  { href: '/app', label: 'Home', icon: <FiHome /> },
  { href: '/app/import', label: 'Importar', icon: <FiTrendingUp /> },
  { href: '/app/profiles', label: 'Profiles', icon: <FiCompass /> },
];

export const NavItem = () => {
  return (
    <>
      {navItems.map(({ href, label, icon }) => (
        <Box
          as="a"
          key={href}
          textDecoration="none"
          _focus={{ boxShadow: 'none' }}
          display="block"
        >
          <Link
            key={href}
            href={href}
            display="flex"
            alignItems="center"
            padding="2"
            borderRadius="md"
          >
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: 'cyan.400',
                color: 'white',
              }}>
              {icon}
              <Text ml="4">{label}</Text>
            </Flex>
          </Link>
        </Box>
      ))}
    </>
  );
};
