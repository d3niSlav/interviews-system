import { CreateCandidateDTO, EditCandidateDTO, CandidateDTO } from './candidates.dto';
import { del, get, post, put } from '../../shared/api';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import { generateSearchQuery } from '../../shared/helpers';

export const getCandidatesRequest = (
  pageConfig: PageSearchQueryConfig = {},
): Promise<PagedResponseDTO<CandidateDTO[]>> => {
  const query = generateSearchQuery(pageConfig);
  return get<PagedResponseDTO<CandidateDTO[]>>(`/candidate${query}`);
};

export const getAllCandidatesRequest = (): Promise<
  DefaultResponseDTO<Pick<CandidateDTO, 'id' | 'firstName' | 'lastName' | 'email'>[]>
> => {
  return get<DefaultResponseDTO<Pick<CandidateDTO, 'id' | 'firstName' | 'lastName' | 'email'>[]>>(`/candidate/list`);
};

export const createCandidateRequest = (data: CreateCandidateDTO): Promise<DefaultResponseDTO<CandidateDTO>> => {
  return post<DefaultResponseDTO<CandidateDTO>, CreateCandidateDTO>('/candidate', data);
};

export const getCandidateRequest = (id: string): Promise<DefaultResponseDTO<CandidateDTO>> => {
  return get<DefaultResponseDTO<CandidateDTO>>(`/candidate/${id}`);
};

export const updateCandidateRequest = (data: EditCandidateDTO): Promise<BasicResponseDTO> => {
  const { id } = data;
  return put<BasicResponseDTO, EditCandidateDTO>(`/candidate/${id}`, data);
};

export const deleteCandidateRequest = (id: string): Promise<BasicResponseDTO> => {
  return del<BasicResponseDTO>(`/candidate/${id}`);
};
