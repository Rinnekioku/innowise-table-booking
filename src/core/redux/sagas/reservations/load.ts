import { put, takeEvery, PutEffect, ForkEffect } from '@redux-saga/core/effects';
import { ReservationsActionsType, ReservationsReducerActions } from '../../reducers/reservations/actions';

function* loadReservationsSagaWorker(action: ReservationsActionsType): Generator<PutEffect> {
    const {payload: data} = action;
    if (Array.isArray(data) && data.length !== 0) {
        yield put ({
            type: ReservationsReducerActions.loadReservations,
            payload: data,
        });
        yield put ({
            type: ReservationsReducerActions.error,
            payload: false,
        });
        yield put ({
            type: ReservationsReducerActions.loading,
            payload: false,
        });
    } else {
        yield put ({
            type: ReservationsReducerActions.loadReservations,
            payload: data,
        });
        yield put ({
            type: ReservationsReducerActions.error,
            payload: true,
        });
        yield put ({
            type: ReservationsReducerActions.loading,
            payload: false,
        });
    }
}

export function* loadReservationsSaga(): Generator<ForkEffect> {
    yield takeEvery(ReservationsReducerActions.sagaLoad, loadReservationsSagaWorker);
}
