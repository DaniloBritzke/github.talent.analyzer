import React from 'react';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { Badge, Box, Flex, List, ListItem, Text, Link } from '@chakra-ui/react';
import { useRepositories } from '@/hooks';
import { useColorModeValue } from '@/components/ui/color-mode';

interface IRepositoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  profileName: string;
}

export const RepositoryDrawer: React.FC<IRepositoryDrawerProps> = ({ isOpen, onClose, profileId, profileName }) => {
  const { data: repositories, isLoading } = useRepositories({ profileId });

  return (
    <DrawerRoot key={profileId} size={'xl'} open={isOpen} closeOnInteractOutside={false} closeOnEscape={false}>
      <DrawerBackdrop />
      <DrawerContent h={"full"}>
        <DrawerHeader>
          <DrawerTitle>Repositórios de {profileName}</DrawerTitle>
          <DrawerCloseTrigger onClick={onClose} />
        </DrawerHeader>
        <DrawerBody>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <List.Root >
              {repositories?.map((repo) => (
                <ListItem bg={useColorModeValue('white', 'gray.700')} key={repo.id} border="1px" borderRadius="md" p={4} boxShadow="sm" mb="2">
                  <Box display="flex" alignItems="center" mb={2} position="relative">
                    <RiGitRepositoryCommitsLine style={{ marginRight: '0.5rem' }} />
                    <Text fontSize="lg" fontWeight="bold">{repo.name}</Text>
                    <Box
                      as="a"
                      key={repo.url}
                      textDecoration="none"
                      position="absolute"
                      right="0" 
                      top="50%" 
                      transform="translateY(-50%)" 
                    >
                      <Link
                        key={repo.url}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
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
                          cursor="pointer"
                          _hover={{
                            bg: 'cyan.400',
                            color: 'white',
                          }}
                        >
                          <FaGithub />
                          <Text ml="4">Ver no GitHub</Text>
                        </Flex>
                      </Link>
                    </Box>
                  </Box>
                  <Text mb={2}>{repo.description || 'Nenhuma descrição disponível'}</Text>
                  <Box>
                    <Badge colorScheme={repo.private ? 'red' : 'green'}>
                      {repo.private ? 'Private' : 'Public'}
                    </Badge>
                    <Text mt={2}>Linguagem: {repo.language || 'N/A'}</Text>
                    <Text>Stars: {repo.stargazersCount}</Text>
                    <Text>Forks: {repo.forksCount}</Text>
                    <Text>Criado em: {new Date(repo.createdAt).toLocaleDateString()}</Text>
                    <Text>Último Commit: {repo.pushedAt ? new Date(repo.pushedAt).toLocaleDateString() : 'N/A'}</Text>

                  </Box>
                </ListItem>
              ))}
            </List.Root>
          )}
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

