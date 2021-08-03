import createSagaMiddleware from 'redux-saga';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadOffices } from './offices/load';
import { all } from '@redux-saga/core/effects';
import { store } from '..';
import { removeOffice } from './offices/addOffice';


export const sagaMiddleware = createSagaMiddleware();

export const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

export function* rootSaga(): any{
    yield all([
        loadOffices(store.dispatch),
    ]);
}
