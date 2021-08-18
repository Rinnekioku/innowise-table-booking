import { put, takeEvery, PutEffect, ForkEffect } from '@redux-saga/core/effects';
import { RoomsActionsType, RoomsReducerActions } from '../../reducers/rooms/actions';

function* loadRoomsSagaWorker(action: RoomsActionsType): Generator<PutEffect>{
    const {payload: data} = action;
    if (Array.isArray(data) && data.length !== 0){
        yield put({
            type: RoomsReducerActions.loadRooms,
            payload: data,
        });
        yield put({
            type: RoomsReducerActions.error,
            payload: false,
        });
        yield put({
            type: RoomsReducerActions.loading,
            payload: false,
        });
    } else {
        yield put({
            type: RoomsReducerActions.error,
            payload: true,
        });
        yield put({
            type: RoomsReducerActions.loading,
            payload: false,
        });
    }
}

export function* loadRoomsSaga(): Generator<ForkEffect> {
    yield takeEvery(RoomsReducerActions.sagaLoad, loadRoomsSagaWorker);
}