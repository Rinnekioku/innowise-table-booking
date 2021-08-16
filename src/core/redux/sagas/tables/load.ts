import { TablesActionsType, TablesReducerActions } from '../../reducers/tables/actions';
import { put, takeEvery, PutEffect, ForkEffect } from '@redux-saga/core/effects';

function* loadTablesSagaWorker(action: TablesActionsType): Generator<PutEffect>{
    const {payload: data} = action;
    if (Array.isArray(data) && data.length !== 0){
        yield put ({
            type: TablesReducerActions.load,
            payload: data,
        });
        yield put ({
            type: TablesReducerActions.loading,
            payload: false,
        });
    } else {
        yield put ({
            type: TablesReducerActions.error,
            payload: true,
        });
        yield put ({
            type: TablesReducerActions.loading,
            payload: false,
        });
    }
}

export function* loadTablesSaga(): Generator<ForkEffect>{
    yield takeEvery(TablesReducerActions.sagaLoad, loadTablesSagaWorker);
}
