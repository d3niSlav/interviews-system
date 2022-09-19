import { TagDTO } from '../Tags/tags.dto';
import { TopicDTO } from '../Topics/topics.dto';

export interface SubjectDTO {
  id: string;
  title: string;
  order?: number;
  topics?: Partial<TopicDTO>[];
  tags?: Partial<TagDTO>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubjectDTO {
  title: string;
  order?: number;
  topicIds?: string[];
  tagIds?: string[];
}

export interface EditSubjectDTO extends CreateSubjectDTO {
  id: string;
}
