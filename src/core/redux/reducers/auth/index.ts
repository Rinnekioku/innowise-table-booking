import { auth } from '../../../firebase';
import { AuthReducerActions } from './actions';

export interface UserEntity {
    isLoggedIn: boolean,
    userId: string,
}

export interface AuthStateEntity {
    user: UserEntity,
    email: string,
    password: string,
    passwordConfirm: string,
}

interface AuthFormActionEntity {
    type: AuthReducerActions.passwordConfirmChange | AuthReducerActions.passwordChange | AuthReducerActions.emailChange,
    payload: string, 
}

interface AuthUserActionEntity {
    type: AuthReducerActions.setUser,
    payload: UserEntity,
}

export type AuthActionEntity = AuthFormActionEntity | AuthUserActionEntity;

const initialState: AuthStateEntity = {
    user: {
        isLoggedIn: auth.currentUser !== null ? true : false,
        userId: auth.currentUser !== null ? auth.currentUser.uid : '',
    },
    email: '',
    password: '',
    passwordConfirm: '',
};

export function authReducer(state: AuthStateEntity = initialState, action: AuthActionEntity): AuthStateEntity {
    switch (action.type) {
    case AuthReducerActions.setUser:
        return ({
            ...state,
            user: {
                isLoggedIn: action.payload.isLoggedIn,
                userId: action.payload.userId,
            }
        });
    case AuthReducerActions.emailChange:
        return ({
            ...state,
            email: action.payload
        });
    case AuthReducerActions.passwordChange:
        return ({
            ...state,
            password: action.payload,
        });
    case AuthReducerActions.passwordConfirmChange:
        return ({
            ...state,
            passwordConfirm: action.payload,
        });
    default:
        return state;
    }
}
