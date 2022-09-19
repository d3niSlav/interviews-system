import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery, takeLatest, SelectEffect, select } from 'redux-saga/effects';

import {
  loadEmployeeListAction,
  setAllEmployeesAction,
  setEmployeeAction,
  setEmployeeListAction,
} from './employees.actions';
import {
  createEmployeeRequest,
  deleteEmployeeRequest,
  getAllEmployeesRequest,
  getEmployeeRequest,
  getEmployeesRequest,
  updateEmployeeRequest,
} from './employees.api';
import { EmployeeDTO } from './employees.dto';
import { selectEmployeesPageConfiguration } from './employees.selectors';
import {
  CLEAR_CURRENT_EMPLOYEE,
  CREATE_EMPLOYEE,
  CreateEmployeeAction,
  DELETE_EMPLOYEE,
  DeleteEmployeeAction,
  EDIT_EMPLOYEE,
  EditEmployeeAction,
  EmployeeActionTypes,
  LOAD_ALL_EMPLOYEES,
  LOAD_EMPLOYEE,
  LOAD_EMPLOYEE_LIST,
  LoadAllEmployeesAction,
  LoadEmployeeAction,
  LoadEmployeeListAction,
} from './employees.types';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../../shared/state/global-request';

function* createNewEmployeeSaga(
  action: CreateEmployeeAction,
): Generator<
  PutEffect<GlobalRequestActions | EmployeeActionTypes> | CallEffect<DefaultResponseDTO<EmployeeDTO>> | SelectEffect
> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(createEmployeeRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectEmployeesPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadEmployeeListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadEmployeeSaga(
  action: LoadEmployeeAction,
): Generator<CallEffect<DefaultResponseDTO<EmployeeDTO>> | PutEffect<GlobalRequestActions | EmployeeActionTypes>> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getEmployeeRequest, id)) as DefaultResponseDTO<EmployeeDTO>;
    yield put(setEmployeeAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* editEmployeeSaga(
  action: EditEmployeeAction,
): Generator<PutEffect<GlobalRequestActions | EmployeeActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(updateEmployeeRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectEmployeesPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadEmployeeListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* deleteEmployeeSaga(
  action: DeleteEmployeeAction,
): Generator<PutEffect<GlobalRequestActions | EmployeeActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(deleteEmployeeRequest, id);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectEmployeesPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadEmployeeListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* resetEmployeeErrors(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(CREATE_EMPLOYEE));
  yield put(setRequestSucceededAction(EDIT_EMPLOYEE));
}

function* loadEmployeesTableData(
  action: LoadEmployeeListAction,
): Generator<
  CallEffect<PagedResponseDTO<EmployeeDTO[]>> | PutEffect<EmployeeActionTypes> | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { pageConfig } = action.payload;
    const { data, pagination, sortOrder } = (yield call(getEmployeesRequest, pageConfig)) as PagedResponseDTO<
      EmployeeDTO[]
    >;
    yield put(setEmployeeListAction({ data, pagination, sortOrder }));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadAllEmployeesData(
  action: LoadAllEmployeesAction,
): Generator<
  | CallEffect<DefaultResponseDTO<Pick<EmployeeDTO, 'id'>[]>>
  | PutEffect<EmployeeActionTypes>
  | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getAllEmployeesRequest)) as DefaultResponseDTO<Pick<EmployeeDTO, 'id'>[]>;
    yield put(setAllEmployeesAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* employeeSaga(): Generator {
  yield takeLatest(CREATE_EMPLOYEE, createNewEmployeeSaga);
  yield takeLatest(LOAD_EMPLOYEE, loadEmployeeSaga);
  yield takeLatest(EDIT_EMPLOYEE, editEmployeeSaga);
  yield takeLatest(DELETE_EMPLOYEE, deleteEmployeeSaga);
  yield takeEvery(CLEAR_CURRENT_EMPLOYEE, resetEmployeeErrors);
  yield takeLatest(LOAD_EMPLOYEE_LIST, loadEmployeesTableData);
  yield takeLatest(LOAD_ALL_EMPLOYEES, loadAllEmployeesData);
}
