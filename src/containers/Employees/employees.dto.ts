import { CandidateDTO } from '../Candidates/candidates.dto';
import { JobTitleDTO } from '../JobTitles/job-titles.dto';

export interface EmployeeDTO {
  id: string;
  candidate: CandidateDTO;
  position: JobTitleDTO;
  salary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmployeeDTO {
  salary?: number;
}

export interface EditEmployeeDTO extends CreateEmployeeDTO {
  id: string;
}
