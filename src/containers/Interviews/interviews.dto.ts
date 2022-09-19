import { JobPositionDTO } from '../JobPositions/job-positions.dto';
import { CandidateDTO } from '../Candidates/candidates.dto';
import { TagDTO } from '../Tags/tags.dto';
import { ProgrammingLanguageDTO } from '../JobTitles/job-titles.dto';

export interface InterviewDTO {
  id: string;
  title: string;
  interviewDate: string;
  position?: JobPositionDTO;
  programmingLanguage?: ProgrammingLanguageDTO;
  tags?: TagDTO[];
  candidates?: CandidateDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInterviewDTO {
  title: string;
  interviewDate?: string;
  positionId?: string;
  tagIds?: string[];
  candidatesIds?: string[];
  programmingLanguageId?: string;
}

export interface EditInterviewDTO extends CreateInterviewDTO {
  id: string;
}
