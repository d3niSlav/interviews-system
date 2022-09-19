import { Status } from '../../constants';
import { RootState } from '../../../store/reducers';

export const selectStatuses =
  (statusType: string) =>
  (state: RootState): Status[] => {
    let statuses = [] as Status[];

    if (state.statuses.hasOwnProperty(statusType)) {
      statuses = state.statuses[statusType];
    }

    return statuses;
  };
