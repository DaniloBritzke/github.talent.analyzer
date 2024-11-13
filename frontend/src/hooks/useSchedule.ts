import { IRequest, IScheduleProfilesData } from '@github.talent.analizer/core'
import { useApiMutation } from '@/context/ApiProvider';
import { useQueryClient } from 'react-query';
export function useSchedule() {
  const client = useQueryClient();
  return useApiMutation<IRequest, IScheduleProfilesData>('POST', '/api/schedule', undefined, {
    onSuccess: () => {
      client.invalidateQueries('/api/profile');
    }
  });
}