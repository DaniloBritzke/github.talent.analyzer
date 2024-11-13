import { Box, Flex } from '@chakra-ui/react';
import { SimpleSidebar } from '../layouts';

export default function HomePage() {
  return (
    <Box >
      <Flex flex="1" minHeight="100vh" width="100vw" direction="column">
        <SimpleSidebar >
          <Box flex="1" p="8" overflow="hidden" mt={{ base: 'auto', md: '0' }}>
            <h1>Bem Vindo ao GitHub Talent Analyzer</h1>
            <p>Uma Ferramenta Integrada de Coleta, Análise e Visualização de Dados
              para Otimizar o Processo de Recrutamento em Tecnologia.</p>
          </Box>
        </SimpleSidebar>
      </Flex>
    </Box>
  );
};
