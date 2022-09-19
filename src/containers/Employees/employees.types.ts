import { CreateEmployeeDTO, EditEmployeeDTO, EmployeeDTO } from './employees.dto';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const LOAD_EMPLOYEE = 'LOAD_EMPLOYEE';
export const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export const CLEAR_CURRENT_EMPLOYEE = 'CLEAR_CURRENT_EMPLOYEE';
export const LOAD_EMPLOYEE_LIST = 'LOAD_EMPLOYEE_LIST';
export const SET_EMPLOYEE_LIST = 'SET_EMPLOYEE_LIST';
export const LOAD_ALL_EMPLOYEES = 'LOAD_ALL_EMPLOYEES';
export const SET_ALL_EMPLOYEES = 'SET_ALL_EMPLOYEES';

export type EmployeesState = {
  employee: EmployeeDTO | null;
  employeeList: TableListData<EmployeeDTO>;
  allEmployees: Pick<EmployeeDTO, 'id'>[];
};

export interface CreateEmployeeAction {
  type: typeof CREATE_EMPLOYEE;
  payload: { data: CreateEmployeeDTO };
}

export interface LoadEmployeeAction {
  type: typeof LOAD_EMPLOYEE;
  payload: { id: string };
}

export interface EditEmployeeAction {
  type: typeof EDIT_EMPLOYEE;
  payload: { data: EditEmployeeDTO };
}

export interface DeleteEmployeeAction {
  type: typeof DELETE_EMPLOYEE;
  payload: { id: string };
}

export interface SetEmployeeAction {
  type: typeof SET_EMPLOYEE;
  payload: { data: EmployeeDTO };
}

export interface ClearEmployeeAction {
  type: typeof CLEAR_CURRENT_EMPLOYEE;
}

export interface LoadEmployeeListAction {
  type: typeof LOAD_EMPLOYEE_LIST;
  payload: { pageConfig?: PageSearchQueryConfig };
}

export interface SetEmployeeListAction {
  type: typeof SET_EMPLOYEE_LIST;
  payload: { tableData: TableListData<EmployeeDTO> };
}

export interface LoadAllEmployeesAction {
  type: typeof LOAD_ALL_EMPLOYEES;
}

export interface SetAllEmployeesAction {
  type: typeof SET_ALL_EMPLOYEES;
  payload: { data: Pick<EmployeeDTO, 'id'>[] };
}

export type EmployeeActionTypes =
  | CreateEmployeeAction
  | LoadEmployeeAction
  | EditEmployeeAction
  | DeleteEmployeeAction
  | SetEmployeeAction
  | ClearEmployeeAction
  | LoadEmployeeListAction
  | SetEmployeeListAction
  | LoadAllEmployeesAction
  | SetAllEmployeesAction;
