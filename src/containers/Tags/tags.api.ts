import { CreateTagDTO, EditTagDTO, TagDTO } from './tags.dto';
import { del, get, post, put } from '../../shared/api';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import { generateSearchQuery } from '../../shared/helpers';

export const getTagsRequest = (pageConfig: PageSearchQueryConfig = {}): Promise<PagedResponseDTO<TagDTO[]>> => {
  const query = generateSearchQuery(pageConfig);
  return get<PagedResponseDTO<TagDTO[]>>(`/tag${query}`);
};

export const getAllTagsRequest = (): Promise<DefaultResponseDTO<Pick<TagDTO, 'id' | 'title'>[]>> => {
  return get<DefaultResponseDTO<Pick<TagDTO, 'id' | 'title'>[]>>(`/tag/list`);
};

export const createTagRequest = (data: CreateTagDTO): Promise<DefaultResponseDTO<TagDTO>> => {
  return post<DefaultResponseDTO<TagDTO>, CreateTagDTO>('/tag', data);
};

export const getTagRequest = (id: string): Promise<DefaultResponseDTO<TagDTO>> => {
  return get<DefaultResponseDTO<TagDTO>>(`/tag/${id}`);
};

export const updateTagRequest = (data: EditTagDTO): Promise<BasicResponseDTO> => {
  const { id } = data;
  return put<BasicResponseDTO, EditTagDTO>(`/tag/${id}`, data);
};

export const deleteTagRequest = (id: string): Promise<BasicResponseDTO> => {
  return del<BasicResponseDTO>(`/tag/${id}`);
};
