import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  IconButton,
  Text,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FiPlus, FiTrash, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { Alert } from '@/components/ui/alert';
import { useSchedule } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export interface IScheduleProfilesData {
  profileUrl:{ profileUrl: string }[];
  name: string;
  description: string;
}

export const ScheduleForm = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<IScheduleProfilesData>({
    defaultValues: {
      profileUrl: [],
      name: '',
      description: '',
    },
  });

  const pattern = /^https:\/\/github\.com\/[A-Za-z0-9_-]+$/; 
  const { fields, append, remove } = useFieldArray<IScheduleProfilesData>({
    control,
    name: `profileUrl`,
  });
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useSchedule();

  const onSubmit = async (data: IScheduleProfilesData) => {
    const profileUrls = data.profileUrl.map((item) => item.profileUrl);
    await mutateAsync({ data: { ...data, profileUrl: profileUrls } })
    setSuccessAlertVisible(true);
    setTimeout(() => {
      setSuccessAlertVisible(true);
      navigate('/profiles');
    }, 2000);
  };


  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%" maxW="600px" mx="auto" mt="8">
      {successAlertVisible && (
        <Alert status="success" mb={4}>
          <FiCheckCircle />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>Perfis foram enviados com sucesso.</AlertDescription>
        </Alert>
      )}
      <VStack >
        <Box w="100%">
          <Text mb="1" fontWeight="bold">
            Nome
          </Text>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Nome é obrigatória' }}
            render={({ field }) => <Input {...field} placeholder="Informe nome" />}
          />
          {errors.name && (
            <Alert
              flex="fit-content"
              alignItems="center"
              justifyContent="flex-start"
              status="error"
              mt="2"
              borderRadius="md">
              {errors.name.message}
            </Alert>
          )}
        </Box>

        <Box w="100%">
          <Text mb="1" fontWeight="bold">
            Descrição
          </Text>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Descrição é obrigatória' }}
            render={({ field }) => <Textarea {...field} placeholder="Informe Descrição" />}
          />
          {errors.description && (
            <Alert
              flex="fit-content"
              alignItems="center"
              justifyContent="flex-start"
              status="error"
              mt="2"
              borderRadius="md">
              {errors.description.message}
            </Alert>
          )}
        </Box>

        {fields.map((field, index) => (
          <Box key={field.id} w="100%">
            <Text mb="1" fontWeight="bold">
              Pefil {index + 1}
            </Text>
            <HStack>
              <Controller
                name={`profileUrl.${index}.profileUrl`}
                control={control}
                rules={{
                  required: 'URL é obrigatória', pattern: {
                    value: pattern,
                    message: 'Formato de URL inválido, deve ser do tipo https://github.com/username'
                  }
                }}
                render={({ field }) => (
                  <Input {...field} placeholder="Informe Pefil" />
                )}
              />
              <IconButton
                aria-label="Remove Pefil"
                onClick={() => remove(index)}
                _hover={{ bg: 'cyan.400', color: 'white', }}
              >
                <FiTrash />
              </IconButton>
            </HStack>
            {errors.profileUrl?.[index]?.profileUrl && (
              <Alert
                flex="fit-content"
                alignItems="center"
                justifyContent="flex-start"
                status="error"
                mt="2"
                borderRadius="md">
                {errors.profileUrl[index]?.profileUrl?.message || 'Error in URL'}
              </Alert>
            )}
          </Box>
        ))}

        <Button onClick={() => append({ profileUrl: '' })} colorScheme="teal" variant="outline" _hover={{ bg: 'cyan.400', color: 'white', }}>
          Adicionar Pefil
          <FiPlus />
        </Button>

        <Button type="submit" colorScheme="teal" alignSelf={'end'} disabled={isSubmitting} _hover={{ bg: 'cyan.400', color: 'white', }}>
          Enviar
        </Button>
      </VStack>
    </Box>
  );
};

