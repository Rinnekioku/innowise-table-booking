import { put, takeEvery, PutEffect, ForkEffect } from '@redux-saga/core/effects';
import { TablesReducerActions } from '../../reducers/tables/actions';

function* dropTablesSagaWorker(): Generator<PutEffect>{
    yield put ({
        type: TablesReducerActions.drop,
    });
    yield put ({
        type: TablesReducerActions.error,
        payload: false
    });
    yield put ({
        type: TablesReducerActions.loading,
        payload: true,
    });
}

export function* dropTablesSaga(): Generator<ForkEffect>{
    yield takeEvery(TablesReducerActions.sagaDrop, dropTablesSagaWorker);
}
