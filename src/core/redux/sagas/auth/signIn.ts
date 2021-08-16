import { put, takeEvery, PutEffect, ForkEffect } from '@redux-saga/core/effects';
import { AuthActionType, AuthReducerActions } from '../../reducers/auth/actions';

function* signInSagaWorker(action: AuthActionType): Generator<PutEffect>{
    yield put ({
        type: AuthReducerActions.setUser, 
        payload: action.payload
    });
    yield put ({
        type: AuthReducerActions.setUserStatus,
        payload: true 
    });
}

export function* signInSaga(): Generator<ForkEffect>{
    yield takeEvery(AuthReducerActions.signIn, signInSagaWorker);
}