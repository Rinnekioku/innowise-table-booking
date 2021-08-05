import { AuthReducerActions } from './actions';

export interface AuthStateEntity {
    email: string,
    password: string,
    passwordConfirm: string,
}

export interface AuthActionEntity {
    type: AuthReducerActions,
    payload: string, 
}

const initialState: AuthStateEntity = {
    email: '',
    password: '',
    passwordConfirm: '',
};

export function authReducer(state: AuthStateEntity = initialState, action: AuthActionEntity): AuthStateEntity {
    switch (action.type) {
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
