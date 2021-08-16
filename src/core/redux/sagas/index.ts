import createSagaMiddleware from 'redux-saga';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, AllEffect, ForkEffect } from '@redux-saga/core/effects';
import { loadOfficesSaga } from './offices/load';
import { loadRoomsSaga } from './rooms/load';
import { dropOfficesSaga } from './offices/drop';
import { dropRoomsSaga } from './rooms/drop';
import { loadTablesSaga } from './tables/load';
import { dropTablesSaga } from './tables/drop';
import { signInSaga } from './auth/signIn';
import { loadReservationsSaga } from './reservations/load';
import { dropReservationsSaga } from './reservations/drop';

export const sagaMiddleware = createSagaMiddleware();

export const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

export function* rootSaga(): Generator<AllEffect<Generator<ForkEffect> > >{
    yield all([
        loadOfficesSaga(),
        loadRoomsSaga(),
        dropOfficesSaga(),
        dropRoomsSaga(),
        loadTablesSaga(),
        dropTablesSaga(),
        signInSaga(),
        loadReservationsSaga(),
        dropReservationsSaga(),
    ]);
}
