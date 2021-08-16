export enum AuthReducerActions {
    signIn = 'SIGN_IN',
    setUser = 'SET_USER',
    setUserStatus = 'SET_USER_STATUS',
}

interface AuthSetUserActionEntity {
    type: AuthReducerActions.setUser,
    payload: string,
}


interface AuthSetUserStatusActionEntity {
    type: AuthReducerActions.setUserStatus,
    payload: boolean
}

export type AuthActionType = 
    AuthSetUserActionEntity |
    AuthSetUserStatusActionEntity;

