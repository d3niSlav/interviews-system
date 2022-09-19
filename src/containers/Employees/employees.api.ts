import { CreateEmployeeDTO, EditEmployeeDTO, EmployeeDTO } from './employees.dto';
import { del, get, post, put } from '../../shared/api';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import { generateSearchQuery } from '../../shared/helpers';

export const getEmployeesRequest = (
  pageConfig: PageSearchQueryConfig = {},
): Promise<PagedResponseDTO<EmployeeDTO[]>> => {
  const query = generateSearchQuery(pageConfig);
  return get<PagedResponseDTO<EmployeeDTO[]>>(`/employee${query}`);
};

export const getAllEmployeesRequest = (): Promise<DefaultResponseDTO<Pick<EmployeeDTO, 'id'>[]>> => {
  return get<DefaultResponseDTO<Pick<EmployeeDTO, 'id'>[]>>(`/employee/list`);
};

export const createEmployeeRequest = (data: CreateEmployeeDTO): Promise<DefaultResponseDTO<EmployeeDTO>> => {
  return post<DefaultResponseDTO<EmployeeDTO>, CreateEmployeeDTO>('/employee', data);
};

export const getEmployeeRequest = (id: string): Promise<DefaultResponseDTO<EmployeeDTO>> => {
  return get<DefaultResponseDTO<EmployeeDTO>>(`/employee/${id}`);
};

export const updateEmployeeRequest = (data: EditEmployeeDTO): Promise<BasicResponseDTO> => {
  const { id } = data;
  return put<BasicResponseDTO, EditEmployeeDTO>(`/employee/${id}`, data);
};

export const deleteEmployeeRequest = (id: string): Promise<BasicResponseDTO> => {
  return del<BasicResponseDTO>(`/employee/${id}`);
};
