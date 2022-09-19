import { EmployeeDTO } from './employees.dto';
import {
  CLEAR_CURRENT_EMPLOYEE,
  EmployeeActionTypes,
  EmployeesState,
  LOAD_EMPLOYEE_LIST,
  SET_ALL_EMPLOYEES,
  SET_EMPLOYEE,
  SET_EMPLOYEE_LIST,
} from './employees.types';
import { getTableListDefaultState } from '../../shared/helpers';

const initialState: EmployeesState = {
  employee: null,
  employeeList: getTableListDefaultState<EmployeeDTO>(),
  allEmployees: [],
};

const employeesReducer = (state = initialState, action: EmployeeActionTypes): EmployeesState => {
  switch (action.type) {
    case CLEAR_CURRENT_EMPLOYEE: {
      return {
        ...state,
        employee: null,
      };
    }
    case SET_EMPLOYEE: {
      return {
        ...state,
        employee: {
          ...action.payload.data,
        },
      };
    }
    case LOAD_EMPLOYEE_LIST: {
      return {
        ...state,
        employeeList: {
          ...state.employeeList,
          filter: action.payload.pageConfig?.filter || {},
          search: action.payload.pageConfig?.search || '',
        },
      };
    }
    case SET_EMPLOYEE_LIST: {
      return {
        ...state,
        employeeList: {
          ...state.employeeList,
          ...action.payload.tableData,
        },
      };
    }
    case SET_ALL_EMPLOYEES: {
      return {
        ...state,
        allEmployees: [...action.payload.data],
      };
    }
    default: {
      return state;
    }
  }
};

export default employeesReducer;
