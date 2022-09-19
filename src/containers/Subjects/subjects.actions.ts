import { CreateSubjectDTO, EditSubjectDTO, SubjectDTO } from './subjects.dto';
import {
  CLEAR_CURRENT_SUBJECT,
  ClearSubjectAction,
  CREATE_SUBJECT,
  CreateSubjectAction,
  DELETE_SUBJECT,
  DeleteSubjectAction,
  EDIT_SUBJECT,
  EditSubjectAction,
  LOAD_ALL_SUBJECTS,
  LOAD_SUBJECT,
  LOAD_SUBJECT_LIST,
  LoadAllSubjectsAction,
  LoadSubjectAction,
  LoadSubjectListAction,
  SET_ALL_SUBJECTS,
  SET_SUBJECT,
  SET_SUBJECT_LIST,
  SetAllSubjectsAction,
  SetSubjectAction,
  SetSubjectListAction,
} from './subjects.types';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const createNewSubjectAction = (data: CreateSubjectDTO): CreateSubjectAction => ({
  type: CREATE_SUBJECT,
  payload: { data },
});

export const editSubjectAction = (data: EditSubjectDTO): EditSubjectAction => ({
  type: EDIT_SUBJECT,
  payload: { data },
});

export const loadSubjectAction = (id: string): LoadSubjectAction => ({
  type: LOAD_SUBJECT,
  payload: { id },
});

export const deleteSubjectAction = (id: string): DeleteSubjectAction => ({
  type: DELETE_SUBJECT,
  payload: { id },
});

export const setSubjectAction = (data: SubjectDTO): SetSubjectAction => ({
  type: SET_SUBJECT,
  payload: { data },
});

export const clearCurrentSubjectAction = (): ClearSubjectAction => ({
  type: CLEAR_CURRENT_SUBJECT,
});

export const loadSubjectListAction = (pageConfig?: PageSearchQueryConfig): LoadSubjectListAction => ({
  type: LOAD_SUBJECT_LIST,
  payload: { pageConfig },
});

export const setSubjectListAction = (tableData: TableListData<SubjectDTO>): SetSubjectListAction => ({
  type: SET_SUBJECT_LIST,
  payload: { tableData },
});

export const loadAllSubjectsAction = (): LoadAllSubjectsAction => ({
  type: LOAD_ALL_SUBJECTS,
});

export const setAllSubjectsAction = (data: Pick<SubjectDTO, 'id' | 'title'>[]): SetAllSubjectsAction => ({
  type: SET_ALL_SUBJECTS,
  payload: { data },
});
