import {createStore} from 'redux';
import { rootReducer } from './reducers';
import { composedEnhancer } from './sagas';
import { sagaMiddleware } from './sagas';
import {all} from 'redux-saga/effects';
import {loadOffices} from './sagas/offices/load';

export const store = createStore(rootReducer, composedEnhancer);

function* rootSaga(): any{
    yield console.log('Root saga');
    yield all([
        loadOffices(store.dispatch)
    ]);
}

sagaMiddleware.run(rootSaga);
