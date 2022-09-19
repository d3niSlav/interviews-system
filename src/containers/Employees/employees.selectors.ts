import { EmployeeDTO } from './employees.dto';
import { PageSearchQueryConfig } from '../../shared/constants';
import { RootState } from '../../store/reducers';

export const selectEmployee = (state: RootState): EmployeeDTO | null => state.employee.employee;

export const selectEmployeesTableData = (state: RootState): EmployeeDTO[] => state.employee.employeeList.data;

export const selectAllEmployeesData = (state: RootState): Pick<EmployeeDTO, 'id'>[] => state.employee.allEmployees;

export const selectEmployeesPageConfiguration = (state: RootState): PageSearchQueryConfig => ({
  filter: state.employee.employeeList.filter,
  limit: state.employee.employeeList.pagination.limit,
  order: state.employee.employeeList.sortOrder.order,
  page: state.employee.employeeList.pagination.page,
  search: state.employee.employeeList.search,
  sortBy: state.employee.employeeList.sortOrder.sortBy,
  totalPages: state.employee.employeeList.pagination.totalPages,
});
