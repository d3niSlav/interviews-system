export interface JobTitleDTO {
  id: string;
  title: string;
  shortTitle?: string;
  minSalary?: string;
  averageSalary?: string;
  maxSalary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobTitleDTO {
  title: string;
  shortTitle?: string;
  minSalary?: number;
  averageSalary?: number;
  maxSalary?: number;
}

export interface ProgrammingLanguageDTO {
  id: string;
  title: string;
}

export interface EditJobTitleDTO extends CreateJobTitleDTO {
  id: string;
}
