import { TopicDTO } from '../Topics/topics.dto';

export interface QuestionDTO {
  id: string;
  text: string;
  topics?: Partial<TopicDTO>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateQuestionDTO {
  text: string;
  topicIds?: string[];
}

export interface EditQuestionDTO extends CreateQuestionDTO {
  id: string;
}
