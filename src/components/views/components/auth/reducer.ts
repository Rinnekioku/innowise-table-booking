import { createContext, Dispatch } from 'react';
import { FormActionType, FromDataContextReducerActions } from './actions';

export interface FormDataContextEntity {
    email: string,
    password: string,
    passwordConfirm: string,
}

export const initialFromDataContextState: FormDataContextEntity = {
    email: '',
    password: '',
    passwordConfirm: '',
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const FormDataContext = createContext<[FormDataContextEntity, Dispatch<FormActionType>]>([initialFromDataContextState, () => {}]);

export function formDataContextReducer(state: FormDataContextEntity, action: FormActionType): FormDataContextEntity{
    switch (action.type) {
    case FromDataContextReducerActions.emailChange:
        return {
            ...state,
            email: action.payload,
        };
    case FromDataContextReducerActions.passwordChange:
        return {
            ...state,
            password: action.payload,
        };
    case FromDataContextReducerActions.passwordConfirmChange:
        return {
            ...state,
            passwordConfirm: action.payload,
        };
    case FromDataContextReducerActions.setAllData:
        return {
            ...state,
            ...action.payload
        };
    case FromDataContextReducerActions.dropAllData:
        return {
            ...state,
            email: '',
            password: '',
            passwordConfirm: '',
        };
    default:
        return state;
    }
}