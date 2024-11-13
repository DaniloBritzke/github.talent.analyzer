import React from 'react';
import { useLanguages } from '@/hooks';
import { NativeSelectField } from '@/components/ui/native-select';
import { useColorModeValue } from '@/components/ui/color-mode';
import { IconButton } from '@chakra-ui/react';
import { IoIosCloseCircleOutline } from 'react-icons/io';


interface LanguageSelectProps {
  onChange: (value: string) => void;
  value: string;
}



export const LanguageSelect: React.FC<LanguageSelectProps> = ({ onChange, value }) => {
  const { data, isLoading, isError } = useLanguages({ language: value });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading languages</p>;

  const languageItems = data?.map((lang: string) => ({
    label: lang,
    value: lang,
  }));

  return (
    <div style={{ position: 'relative' }}>
      <NativeSelectField
        bg={useColorModeValue('white', 'gray.600')}
        items={languageItems}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Linguagem"
      />
      {value && (
        <IconButton
          aria-label="Remover seleção"
          onClick={() => onChange('')}
          position="absolute"
          right="10px"
          top="50%"
          transform="translateY(-50%)"
          size="sm"
          variant="ghost"
        ><IoIosCloseCircleOutline /></IconButton>
      )}
    </div>
  );
};