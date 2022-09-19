import { CreateJobPositionDTO, EditJobPositionDTO, JobPositionDTO } from './job-positions.dto';
import { del, get, post, put } from '../../shared/api';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import { generateSearchQuery } from '../../shared/helpers';

export const getJobPositionsRequest = (
  pageConfig: PageSearchQueryConfig = {},
): Promise<PagedResponseDTO<JobPositionDTO[]>> => {
  const query = generateSearchQuery(pageConfig);
  return get<PagedResponseDTO<JobPositionDTO[]>>(`/position${query}`);
};

export const getAllJobPositionsRequest = (): Promise<DefaultResponseDTO<Pick<JobPositionDTO, 'id' | 'title'>[]>> => {
  return get<DefaultResponseDTO<Pick<JobPositionDTO, 'id' | 'title'>[]>>(`/position/list`);
};

export const createJobPositionRequest = (data: CreateJobPositionDTO): Promise<DefaultResponseDTO<JobPositionDTO>> => {
  return post<DefaultResponseDTO<JobPositionDTO>, CreateJobPositionDTO>('/position', data);
};

export const getJobPositionRequest = (id: string): Promise<DefaultResponseDTO<JobPositionDTO>> => {
  return get<DefaultResponseDTO<JobPositionDTO>>(`/position/${id}`);
};

export const updateJobPositionRequest = (data: EditJobPositionDTO): Promise<BasicResponseDTO> => {
  const { id } = data;
  return put<BasicResponseDTO, EditJobPositionDTO>(`/position/${id}`, data);
};

export const deleteJobPositionRequest = (id: string): Promise<BasicResponseDTO> => {
  return del<BasicResponseDTO>(`/position/${id}`);
};
