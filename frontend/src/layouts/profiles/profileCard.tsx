import { useColorModeValue } from '@/components/ui/color-mode';
import { Tooltip } from '@/components/ui/tooltip';
import { Box, Text, VStack,  Badge, Button } from '@chakra-ui/react';
import { IProfile } from '@github.talent.analizer/core'
import { useState } from 'react';
import { RepositoryDrawer } from '../repository';

interface ProfileCardProps {
  profile: IProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    console.log(isDrawerOpen)
    setDrawerOpen((prev) => !prev);
    console.log(isDrawerOpen)
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      boxShadow="sm"
      h="xs"
      maxH="xs"
 
      bg={useColorModeValue('white', 'gray.600')}
    >
      <VStack margin="4">
        <Text fontSize="xl" fontWeight="bold">
          {profile.name}
        </Text>
        {profile.company && <Badge colorScheme="blue">{profile.company}</Badge>}
        <Tooltip content={profile.bio || 'Bio não disponível'} disabled={!profile.bio}>
          <Text maxW="sm" truncate={true}>
            {profile.bio || 'Bio não disponível'}
          </Text>
        </Tooltip>
        <Text>Seguidores: {profile.followers || 0}</Text>
        <Text>Seguindo: {profile.following || 0}</Text>
        {profile.location && <Text>Location: {profile.location}</Text>}
        {/* {profile.email && <Text>Email: {profile.email}</Text>} */}

        <Button colorScheme="teal" onClick={toggleDrawer}>
          Visualizar Repositórios
        </Button>

        <RepositoryDrawer
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          profileId={profile.id}
          profileName={profile.name}
          key={profile.id}
        />
      </VStack>
    </Box>
  );
};
