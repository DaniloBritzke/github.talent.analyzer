import { Flex, Heading, Text, Link } from '@chakra-ui/react';

export default function Page404() {
  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      maxH="100vh"
      overflow="hidden"
      justifyContent="center"
      alignItems="center"
      color="gray.200"
    >
      <Heading fontSize="8xl">404</Heading>
      <Text fontSize="4xl">Página não encontrada!</Text>
      <Link href="/">Voltar para página inicial</Link>
    </Flex>
  );
}
