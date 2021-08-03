import {createStore} from 'redux';
import { rootReducer } from './reducers';
import { composedEnhancer } from './sagas';
import { sagaMiddleware } from './sagas';
import { rootSaga } from './sagas';

export const store = createStore(rootReducer, composedEnhancer);

sagaMiddleware.run(rootSaga);
