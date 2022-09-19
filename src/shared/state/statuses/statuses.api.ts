import { get } from '../../api';
import { DefaultResponseDTO, Status } from '../../constants';

export const getStatusesRequest = (type: string): Promise<DefaultResponseDTO<Status[]>> => {
  return get<DefaultResponseDTO<Status[]>>(`/statuses?type=${type}`);
};
