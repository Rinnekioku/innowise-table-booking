interface AuthStateEntity {
    email: string,
    password: string,
    passwordConfirm: string,
}

interface AuthActionEntity {
    type: 'EMAIL_CHANGE' | 'PASSWORD_CHANGE' | 'PASSWORD_CONFIRM_CHANGE',
    payload: string, 
}

const initialState: AuthStateEntity = {
    email: '',
    password: '',
    passwordConfirm: '',
};

export function authReducer(state: AuthStateEntity = initialState, action: AuthActionEntity): AuthStateEntity {
    switch (action.type) {
    case 'EMAIL_CHANGE':
        return ({
            ...state,
            email: action.payload
        });
    case 'PASSWORD_CHANGE':
        return ({
            ...state,
            password: action.payload,
        });
    case 'PASSWORD_CONFIRM_CHANGE':
        return ({
            ...state,
            passwordConfirm: action.payload,
        });
    default:
        return state;
    }
}
