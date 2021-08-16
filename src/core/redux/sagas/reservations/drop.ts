import { put, takeEvery, PutEffect, ForkEffect } from '@redux-saga/core/effects';
import { ReservationsReducerActions } from '../../reducers/reservations/actions';

function* dropReservationsSagaWorker (): Generator<PutEffect> {
    yield put ({type: ReservationsReducerActions.drop});
    yield put ({type: ReservationsReducerActions.loading, payload: true});
    yield put ({type: ReservationsReducerActions.error, payload: false});
}

export function* dropReservationsSaga(): Generator<ForkEffect> {
    yield takeEvery(ReservationsReducerActions.dropSaga, dropReservationsSagaWorker);
}
