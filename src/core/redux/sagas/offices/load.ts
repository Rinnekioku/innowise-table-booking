import { OfficesActionsType } from '../../reducers/offices/actions';
import { put, PutEffect, takeEvery, ForkEffect } from '@redux-saga/core/effects';
import { OfficesReducerActions } from '../../reducers/offices/actions';

function* loadOfficesSagaWorker(action: OfficesActionsType): Generator<PutEffect>{
    const {payload: data} = action;
    if (Array.isArray(data) && data.length !== 0){
        yield put({
            type: OfficesReducerActions.loadOffices,
            payload: data
        });
        yield put({
            type: OfficesReducerActions.loading,
            payload: false,
        });
    } else {
        yield put({
            type: OfficesReducerActions.loading,
            payload: false,
        });
        yield put({
            type: OfficesReducerActions.error,
            payload: true,
        });
    }
}

export function* loadOfficesSaga(): Generator<ForkEffect> {
    yield takeEvery(OfficesReducerActions.sagaLoad, loadOfficesSagaWorker);
}
