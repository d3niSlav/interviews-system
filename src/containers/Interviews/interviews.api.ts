import { CreateInterviewDTO, EditInterviewDTO, InterviewDTO } from './interviews.dto';
import { del, get, post, put } from '../../shared/api';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import { generateSearchQuery } from '../../shared/helpers';

export const getInterviewsRequest = (
  pageConfig: PageSearchQueryConfig = {},
): Promise<PagedResponseDTO<InterviewDTO[]>> => {
  const query = generateSearchQuery(pageConfig);
  console.log(pageConfig);
  return get<PagedResponseDTO<InterviewDTO[]>>(`/interview${query}`);
};

export const createInterviewRequest = (data: CreateInterviewDTO): Promise<DefaultResponseDTO<InterviewDTO>> => {
  return post<DefaultResponseDTO<InterviewDTO>, CreateInterviewDTO>('/interview', data);
};

export const getInterviewRequest = (id: string): Promise<DefaultResponseDTO<InterviewDTO>> => {
  return get<DefaultResponseDTO<InterviewDTO>>(`/interview/${id}`);
};

export const updateInterviewRequest = (data: EditInterviewDTO): Promise<BasicResponseDTO> => {
  const { id } = data;
  return put<BasicResponseDTO, EditInterviewDTO>(`/interview/${id}`, data);
};

export const deleteInterviewRequest = (id: string): Promise<BasicResponseDTO> => {
  return del<BasicResponseDTO>(`/interview/${id}`);
};
