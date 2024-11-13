import { IListRepositoriesOptions, IRepository } from '@github.talent.analizer/core'
import { useApiQuery } from '@/context/ApiProvider';
import { UseQueryResult } from 'react-query';


export function useRepositories({ profileId }: IListRepositoriesOptions): UseQueryResult<IRepository[]> {
  return useApiQuery('GET', `/api/profile/${profileId}/repository`, { });
}