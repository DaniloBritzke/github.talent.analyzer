import { IListLanguagesOptions, IListLanguagesResult } from '@github.talent.analizer/core'
import { useApiQuery } from '@/context/ApiProvider';
import { UseQueryResult } from 'react-query';


export function useLanguages({ language }: IListLanguagesOptions): UseQueryResult<IListLanguagesResult> {
  return useApiQuery('GET', `/api/language`, { language });
}