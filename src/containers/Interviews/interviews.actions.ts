import { CreateInterviewDTO, EditInterviewDTO, InterviewDTO } from './interviews.dto';
import {
  CLEAR_CURRENT_INTERVIEW,
  ClearInterviewAction,
  CREATE_INTERVIEW,
  CreateInterviewAction,
  DELETE_INTERVIEW,
  DeleteInterviewAction,
  EDIT_INTERVIEW,
  EditInterviewAction,
  LOAD_INTERVIEW,
  LOAD_INTERVIEW_LIST,
  LoadInterviewAction,
  LoadInterviewListAction,
  SET_INTERVIEW,
  SET_INTERVIEW_LIST,
  SetInterviewAction,
  SetInterviewListAction,
} from './interviews.types';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const createNewInterviewAction = (data: CreateInterviewDTO): CreateInterviewAction => ({
  type: CREATE_INTERVIEW,
  payload: { data },
});

export const editInterviewAction = (data: EditInterviewDTO): EditInterviewAction => ({
  type: EDIT_INTERVIEW,
  payload: { data },
});

export const loadInterviewAction = (id: string): LoadInterviewAction => ({
  type: LOAD_INTERVIEW,
  payload: { id },
});

export const deleteInterviewAction = (id: string): DeleteInterviewAction => ({
  type: DELETE_INTERVIEW,
  payload: { id },
});

export const setInterviewAction = (data: InterviewDTO): SetInterviewAction => ({
  type: SET_INTERVIEW,
  payload: { data },
});

export const clearCurrentInterviewAction = (): ClearInterviewAction => ({
  type: CLEAR_CURRENT_INTERVIEW,
});

export const loadInterviewListAction = (pageConfig?: PageSearchQueryConfig): LoadInterviewListAction => ({
  type: LOAD_INTERVIEW_LIST,
  payload: { pageConfig },
});

export const setInterviewListAction = (tableData: TableListData<InterviewDTO>): SetInterviewListAction => ({
  type: SET_INTERVIEW_LIST,
  payload: { tableData },
});
