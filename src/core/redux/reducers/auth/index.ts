import { auth } from '../../../firebase';
import { AuthActionType, AuthReducerActions } from './actions';

export interface AuthStateEntity {
    isLoggedIn: boolean,
    userId: string,
}

const initialState: AuthStateEntity = {
    isLoggedIn: auth.currentUser !== null ? true : false,
    userId: auth.currentUser !== null ? auth.currentUser.uid : ''
};

export function authReducer(state: AuthStateEntity = initialState, action: AuthActionType): AuthStateEntity {
    switch (action.type) {
    case AuthReducerActions.setUser:
        return ({
            ...state,
            userId: action.payload,
        });
    case AuthReducerActions.setUserStatus:
        return ({
            ...state,
            isLoggedIn: action.payload,
        });
    default:
        return state;
    }
}
