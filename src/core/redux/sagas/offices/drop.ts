import { OfficesReducerActions } from '../../reducers/offices/actions';
import { put, takeEvery, PutEffect, ForkEffect } from '@redux-saga/core/effects';

function* dropOfficesSagaWorker(): Generator<PutEffect> {
    yield put ({
        type: OfficesReducerActions.drop,
    });
    yield put ({
        type: OfficesReducerActions.loading,
        payload: true,
    });
    yield put ({
        type: OfficesReducerActions.error,
        payload: false,
    });
}

export function* dropOfficesSaga(): Generator<ForkEffect>{
    yield takeEvery(OfficesReducerActions.sagaDrop, dropOfficesSagaWorker);
}
