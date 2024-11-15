import { useColorModeValue } from '@/components/ui/color-mode';
import { useProfiles } from '@/hooks';
import { SimpleSidebar } from '@/layouts';
import { FilterContainer } from '@/layouts/FilterBar';
import { ProfileCard } from '@/layouts/profiles';
import { LanguageSelect } from '@/layouts/select/SelectLanguages';
import { Box, Flex, GridItem, Input, NativeSelect, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';


export default function Profiles() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [ids, setId] = useState('');
  const [parsedIds, setParsedId] = useState<string[]>([]);

  useEffect(() => {
    if (ids) {
      const parsedArray = ids.split(',').map((id) => id.trim());
      setParsedId(parsedArray);
    } else {
      setParsedId([]);
    }
  }, [ids]);

  const { data, refetch } = useProfiles({ name, ids: parsedIds, language });

  const refresh = () => refetch()

  return (
    <Flex flex="1" bg={useColorModeValue('white', 'gray.700')} overflow="auto" height="100vh" width="100vw" direction="column">
      <SimpleSidebar >
        <FilterContainer onReset={refresh}>
          <Flex flex="1">
          <Input
            mr="1rem"
            w="min"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <NativeSelect.Root>
            <LanguageSelect
              value={language}
              onChange={(newValue) => setLanguage(newValue)}
            />
          </NativeSelect.Root>
          </Flex>
        </FilterContainer>
        
        <Box mt={{ base: 'auto', md: '0' }} p="1rem">
          <SimpleGrid
            pb="2rem"
            minChildWidth="sm"
            gap="40px"
          >
            {data?.map((profile) => (
              <GridItem key={profile.id}>
                <ProfileCard profile={profile} />
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
        
      </SimpleSidebar>
    </Flex>
  );
}