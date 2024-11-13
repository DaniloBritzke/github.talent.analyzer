import { IProfile,  IProfileListOptions } from '@github.talent.analizer/core'
import { useApiQuery } from '@/context/ApiProvider';
import { UseQueryResult } from 'react-query';


export function useProfiles({ ids, name, requestId, language }: IProfileListOptions): UseQueryResult<IProfile[]> {
  return useApiQuery('GET', `/api/profile`, { ids, name, requestId, language });
}