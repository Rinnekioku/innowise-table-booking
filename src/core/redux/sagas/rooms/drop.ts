import { put, takeEvery, PutEffect, ForkEffect } from '@redux-saga/core/effects';
import { RoomsReducerActions } from '../../reducers/rooms/actions';

function* dropRoomsSagaWorker(): Generator<PutEffect>{
    yield put ({
        type: RoomsReducerActions.drop
    });
    yield put ({
        type: RoomsReducerActions.loading,
        payload: true,
    });
    yield put ({
        type: RoomsReducerActions.error,
        payload: false,
    });
}

export function* dropRoomsSaga(): Generator<ForkEffect>{
    yield takeEvery(RoomsReducerActions.sagaDrop, dropRoomsSagaWorker);
}