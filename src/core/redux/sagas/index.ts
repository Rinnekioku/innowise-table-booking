import createSagaMiddleware from 'redux-saga';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const sagaMiddleware = createSagaMiddleware();

export const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));


