import jwtDecode from 'jwt-decode';

import { UserDto } from './Auth.dtos';
import { AuthActionTypes, AuthState, INITIALIZE_USER, SET_USER_FROM_TOKEN } from './Auth.types';
import { getJWTToken } from '../../shared/web-storage';

const initialState: AuthState = {
  user: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case INITIALIZE_USER: {
      const userToken = getJWTToken();
      let user: UserDto | null = null;

      if (userToken) {
        user = jwtDecode<UserDto>(userToken);
      }

      return {
        ...state,
        user,
      };
    }
    case SET_USER_FROM_TOKEN: {
      const { token } = action.payload;
      const user = jwtDecode<UserDto>(token);

      return {
        ...state,
        user,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
