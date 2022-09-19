import { UserDto } from './Auth.dtos';
import { RootState } from '../../store/reducers';

export const selectUser = (state: RootState): UserDto | null => state.auth.user;

export const selectIsUserAuthenticated = (state: RootState): boolean => !!state.auth.user;
