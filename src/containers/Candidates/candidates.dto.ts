import { JobTitleDTO } from '../JobTitles/job-titles.dto';
import { TagDTO } from '../Tags/tags.dto';

export interface WorkExperienceDTO {
  id: string;
  jobTitle: string;
  seniorityLevel: string;
  years?: string;
  skills?: TagDTO[];
  fields: string[];
}

export interface CandidateDTO {
  id: string;
  salary?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  introduction?: string;
  dateOfBirth?: string;
  age?: number;
  currentCountry?: string;
  currentCity?: string;
  currentAddress?: string;
  permanentCountry?: string;
  permanentCity?: string;
  permanentAddress?: string;
  gender?: string;
  desiredSalary?: number;
  desiredLocation?: string;
  relocate?: boolean;
  workModel?: string;
  status?: string;
  positionIds?: string[];
  createdAt: Date;
  updatedAt: Date;
  experience: WorkExperienceDTO[];
  position: JobTitleDTO[];
}

export interface CreateCandidateDTO {
  salary?: number;
}

export interface EditCandidateDTO extends CreateCandidateDTO {
  id: string;
}
