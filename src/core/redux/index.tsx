import {createStore} from 'redux';
import { rootReducer } from './reducers';
import { composedEnhancer, rootSaga} from './sagas';
import { sagaMiddleware } from './sagas';

export const store = createStore(rootReducer, composedEnhancer);

export type RootState = ReturnType<typeof store.getState>

sagaMiddleware.run(rootSaga);