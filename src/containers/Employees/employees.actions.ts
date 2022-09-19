import { CreateEmployeeDTO, EditEmployeeDTO, EmployeeDTO } from './employees.dto';
import {
  CLEAR_CURRENT_EMPLOYEE,
  ClearEmployeeAction,
  CREATE_EMPLOYEE,
  CreateEmployeeAction,
  DELETE_EMPLOYEE,
  DeleteEmployeeAction,
  EDIT_EMPLOYEE,
  EditEmployeeAction,
  LOAD_ALL_EMPLOYEES,
  LOAD_EMPLOYEE,
  LOAD_EMPLOYEE_LIST,
  LoadAllEmployeesAction,
  LoadEmployeeAction,
  LoadEmployeeListAction,
  SET_ALL_EMPLOYEES,
  SET_EMPLOYEE,
  SET_EMPLOYEE_LIST,
  SetAllEmployeesAction,
  SetEmployeeAction,
  SetEmployeeListAction,
} from './employees.types';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const createNewEmployeeAction = (data: CreateEmployeeDTO): CreateEmployeeAction => ({
  type: CREATE_EMPLOYEE,
  payload: { data },
});

export const editEmployeeAction = (data: EditEmployeeDTO): EditEmployeeAction => ({
  type: EDIT_EMPLOYEE,
  payload: { data },
});

export const loadEmployeeAction = (id: string): LoadEmployeeAction => ({
  type: LOAD_EMPLOYEE,
  payload: { id },
});

export const deleteEmployeeAction = (id: string): DeleteEmployeeAction => ({
  type: DELETE_EMPLOYEE,
  payload: { id },
});

export const setEmployeeAction = (data: EmployeeDTO): SetEmployeeAction => ({
  type: SET_EMPLOYEE,
  payload: { data },
});

export const clearCurrentEmployeeAction = (): ClearEmployeeAction => ({
  type: CLEAR_CURRENT_EMPLOYEE,
});

export const loadEmployeeListAction = (pageConfig?: PageSearchQueryConfig): LoadEmployeeListAction => ({
  type: LOAD_EMPLOYEE_LIST,
  payload: { pageConfig },
});

export const setEmployeeListAction = (tableData: TableListData<EmployeeDTO>): SetEmployeeListAction => ({
  type: SET_EMPLOYEE_LIST,
  payload: { tableData },
});

export const loadAllEmployeesAction = (): LoadAllEmployeesAction => ({
  type: LOAD_ALL_EMPLOYEES,
});

export const setAllEmployeesAction = (data: Pick<EmployeeDTO, 'id'>[]): SetAllEmployeesAction => ({
  type: SET_ALL_EMPLOYEES,
  payload: { data },
});
