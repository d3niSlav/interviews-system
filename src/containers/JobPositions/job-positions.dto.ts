import { InterviewDTO } from '../Interviews/interviews.dto';
import { JobTitleDTO } from '../JobTitles/job-titles.dto';

export interface JobPositionDTO {
  id: string;
  title: string;
  jobTitle?: JobTitleDTO;
  interviews?: InterviewDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobPositionDTO {
  title: string;
  jobTitleId: string;
}

export interface EditJobPositionDTO extends CreateJobPositionDTO {
  id: string;
}
