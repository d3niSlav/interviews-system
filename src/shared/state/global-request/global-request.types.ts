import { AxiosError } from 'axios';

import { REQUEST_FAILED_NETWORK, REQUEST_FAILED, REQUEST_STARTED, REQUEST_SUCCEEDED } from './global-request.constants';
import { FormErrors } from '../../constants';

export const CLEAR_REQUEST_FAILED = 'CLEAR_REQUEST_FAILED';

export interface ErrorRequestState {
  errorMessage: string;
  errors?: FormErrors;
}

export interface DefaultRequestState extends ErrorRequestState {
  isLoading: boolean;
}

export interface GlobalRequestState {
  [key: string]: DefaultRequestState;
}

export interface GlobalRequestStartedAction {
  type: typeof REQUEST_STARTED;
  payload: {
    requestType: string;
  };
}

export interface GlobalRequestFailedAction {
  type: typeof REQUEST_FAILED;
  payload: {
    requestType: string;
    data: AxiosError;
  };
}

export interface GlobalRequestSucceededAction {
  type: typeof REQUEST_SUCCEEDED;
  payload: {
    requestType: string;
  };
}

export interface GlobalRequestFailedNetworkAction {
  type: typeof REQUEST_FAILED_NETWORK;
  payload: {
    requestType: string;
    data: ErrorRequestState;
  };
}

export interface ClearRequestFailedAction {
  type: typeof CLEAR_REQUEST_FAILED;
  payload: {
    requestType: string;
  };
}

export type GlobalRequestActions =
  | GlobalRequestStartedAction
  | GlobalRequestFailedNetworkAction
  | ClearRequestFailedAction
  | GlobalRequestFailedAction
  | GlobalRequestSucceededAction;
