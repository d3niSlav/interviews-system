import { CreateTopicDTO, EditTopicDTO, TopicDTO } from './topics.dto';
import { del, get, post, put } from '../../shared/api';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import { generateSearchQuery } from '../../shared/helpers';

export const getTopicsRequest = (pageConfig: PageSearchQueryConfig = {}): Promise<PagedResponseDTO<TopicDTO[]>> => {
  const query = generateSearchQuery(pageConfig);
  return get<PagedResponseDTO<TopicDTO[]>>(`/topic${query}`);
};

export const getAllTopicsRequest = (): Promise<DefaultResponseDTO<Pick<TopicDTO, 'id' | 'title'>[]>> => {
  return get<DefaultResponseDTO<Pick<TopicDTO, 'id' | 'title'>[]>>(`/topic/list`);
};

export const createTopicRequest = (data: CreateTopicDTO): Promise<DefaultResponseDTO<TopicDTO>> => {
  return post<DefaultResponseDTO<TopicDTO>, CreateTopicDTO>('/topic', data);
};

export const getTopicRequest = (id: string): Promise<DefaultResponseDTO<TopicDTO>> => {
  return get<DefaultResponseDTO<TopicDTO>>(`/topic/${id}`);
};

export const updateTopicRequest = (data: EditTopicDTO): Promise<BasicResponseDTO> => {
  const { id } = data;
  return put<BasicResponseDTO, EditTopicDTO>(`/topic/${id}`, data);
};

export const deleteTopicRequest = (id: string): Promise<BasicResponseDTO> => {
  return del<BasicResponseDTO>(`/topic/${id}`);
};
