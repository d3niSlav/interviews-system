import { CreateJobTitleDTO, EditJobTitleDTO, JobTitleDTO, ProgrammingLanguageDTO } from './job-titles.dto';
import { del, get, post, put } from '../../shared/api';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import { generateSearchQuery } from '../../shared/helpers';

export const getJobTitlesRequest = (
  pageConfig: PageSearchQueryConfig = {},
): Promise<PagedResponseDTO<JobTitleDTO[]>> => {
  const query = generateSearchQuery(pageConfig);
  return get<PagedResponseDTO<JobTitleDTO[]>>(`/job-title${query}`);
};

export const getAllJobTitlesRequest = (): Promise<DefaultResponseDTO<Pick<JobTitleDTO, 'id' | 'title'>[]>> => {
  return get<DefaultResponseDTO<Pick<JobTitleDTO, 'id' | 'title'>[]>>(`/job-title/list`);
};

export const getAllProgrammingLanguagesRequest = (): Promise<
  DefaultResponseDTO<Pick<ProgrammingLanguageDTO, 'id' | 'title'>[]>
> => {
  return get<DefaultResponseDTO<Pick<ProgrammingLanguageDTO, 'id' | 'title'>[]>>(`/programmingLanguage/list`);
};

export const createJobTitleRequest = (data: CreateJobTitleDTO): Promise<DefaultResponseDTO<JobTitleDTO>> => {
  return post<DefaultResponseDTO<JobTitleDTO>, CreateJobTitleDTO>('/job-title', data);
};

export const getJobTitleRequest = (id: string): Promise<DefaultResponseDTO<JobTitleDTO>> => {
  return get<DefaultResponseDTO<JobTitleDTO>>(`/job-title/${id}`);
};

export const updateJobTitleRequest = (data: EditJobTitleDTO): Promise<BasicResponseDTO> => {
  const { id } = data;
  return put<BasicResponseDTO, EditJobTitleDTO>(`/job-title/${id}`, data);
};

export const deleteJobTitleRequest = (id: string): Promise<BasicResponseDTO> => {
  return del<BasicResponseDTO>(`/job-title/${id}`);
};
