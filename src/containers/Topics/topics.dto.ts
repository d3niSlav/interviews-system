import { SubjectDTO } from '../Subjects/subjects.dto';
import { TagDTO } from '../Tags/tags.dto';

export interface TopicDTO {
  id: string;
  title: string;
  difficulty: string;
  subject: Partial<SubjectDTO>;
  order?: string;
  questions?: any[];
  tags?: TagDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTopicDTO {
  title: string;
  difficulty?: string;
  subjectId?: string;
  order?: number;
  questionIds?: string[];
  tagIds?: string[];
}

export interface EditTopicDTO extends CreateTopicDTO {
  id: string;
}
