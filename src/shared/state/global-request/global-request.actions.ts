import { AxiosError } from 'axios';

import { REQUEST_FAILED, REQUEST_FAILED_NETWORK, REQUEST_STARTED, REQUEST_SUCCEEDED } from './global-request.constants';
import {
  ErrorRequestState,
  GlobalRequestFailedNetworkAction,
  GlobalRequestFailedAction,
  GlobalRequestStartedAction,
  GlobalRequestSucceededAction,
  ClearRequestFailedAction,
  CLEAR_REQUEST_FAILED,
} from './global-request.types';

export const setRequestStartedAction = (requestType: string): GlobalRequestStartedAction => ({
  type: REQUEST_STARTED,
  payload: { requestType },
});

export const setRequestFailedAction = (requestType: string, data: AxiosError): GlobalRequestFailedAction => ({
  type: REQUEST_FAILED,
  payload: { requestType, data },
});

export const setRequestFailedNetworkAction = (
  requestType: string,
  data: ErrorRequestState,
): GlobalRequestFailedNetworkAction => ({
  type: REQUEST_FAILED_NETWORK,
  payload: { requestType, data },
});

export const setRequestSucceededAction = (requestType: string): GlobalRequestSucceededAction => ({
  type: REQUEST_SUCCEEDED,
  payload: { requestType },
});

export const clearRequestFailedAction = (requestType: string): ClearRequestFailedAction => ({
  type: CLEAR_REQUEST_FAILED,
  payload: { requestType },
});
