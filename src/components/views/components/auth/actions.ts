import { FormDataContextEntity } from './reducer';

export enum FromDataContextReducerActions {
    emailChange = 'EMAIL_CHANGE',
    passwordChange = 'PASSWORD_CHANGE',
    passwordConfirmChange = 'PASSWORD_CONFIRM_CHANGE',
    setAllData = 'SET_ALL_DATA',
    dropAllData= 'DROP_ALL_DATA',
}

interface FromSimpleDataChange {
    type: FromDataContextReducerActions.emailChange | FromDataContextReducerActions.passwordConfirmChange | FromDataContextReducerActions.passwordChange,
    payload: string,
}

interface FromAllDataChange {
    type: FromDataContextReducerActions.setAllData,
    payload: FormDataContextEntity,
}

interface FormDropDataChange {
    type: FromDataContextReducerActions.dropAllData,
}

export type FormActionType = 
    FromSimpleDataChange |
    FromAllDataChange |
    FormDropDataChange;
