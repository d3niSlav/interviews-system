import { CreateQuestionDTO, EditQuestionDTO, QuestionDTO } from './questions.dto';
import { del, get, post, put } from '../../shared/api';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import { generateSearchQuery } from '../../shared/helpers';

export const getQuestionsRequest = (
  pageConfig: PageSearchQueryConfig = {},
): Promise<PagedResponseDTO<QuestionDTO[]>> => {
  const query = generateSearchQuery(pageConfig);
  return get<PagedResponseDTO<QuestionDTO[]>>(`/question${query}`);
};

export const createQuestionRequest = (data: CreateQuestionDTO): Promise<DefaultResponseDTO<QuestionDTO>> => {
  return post<DefaultResponseDTO<QuestionDTO>, CreateQuestionDTO>('/question', data);
};

export const getQuestionRequest = (id: string): Promise<DefaultResponseDTO<QuestionDTO>> => {
  return get<DefaultResponseDTO<QuestionDTO>>(`/question/${id}`);
};

export const updateQuestionRequest = (data: EditQuestionDTO): Promise<BasicResponseDTO> => {
  const { id } = data;
  return put<BasicResponseDTO, EditQuestionDTO>(`/question/${id}`, data);
};

export const deleteQuestionRequest = (id: string): Promise<BasicResponseDTO> => {
  return del<BasicResponseDTO>(`/question/${id}`);
};
