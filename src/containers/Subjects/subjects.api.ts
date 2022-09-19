import { CreateSubjectDTO, EditSubjectDTO, SubjectDTO } from './subjects.dto';
import { del, get, post, put } from '../../shared/api';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import { generateSearchQuery } from '../../shared/helpers';

export const getSubjectsRequest = (pageConfig: PageSearchQueryConfig = {}): Promise<PagedResponseDTO<SubjectDTO[]>> => {
  const query = generateSearchQuery(pageConfig);
  return get<PagedResponseDTO<SubjectDTO[]>>(`/subject${query}`);
};

export const getAllSubjectsRequest = (): Promise<DefaultResponseDTO<Pick<SubjectDTO, 'id' | 'title'>[]>> => {
  return get<DefaultResponseDTO<Pick<SubjectDTO, 'id' | 'title'>[]>>(`/subject/list`);
};

export const createSubjectRequest = (data: CreateSubjectDTO): Promise<DefaultResponseDTO<SubjectDTO>> => {
  return post<DefaultResponseDTO<SubjectDTO>, CreateSubjectDTO>('/subject', data);
};

export const getSubjectRequest = (id: string): Promise<DefaultResponseDTO<SubjectDTO>> => {
  return get<DefaultResponseDTO<SubjectDTO>>(`/subject/${id}`);
};

export const updateSubjectRequest = (data: EditSubjectDTO): Promise<BasicResponseDTO> => {
  const { id } = data;
  return put<BasicResponseDTO, EditSubjectDTO>(`/subject/${id}`, data);
};

export const deleteSubjectRequest = (id: string): Promise<BasicResponseDTO> => {
  return del<BasicResponseDTO>(`/subject/${id}`);
};
