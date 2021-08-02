import {createStore} from 'redux';
import { rootReducer } from './reducers';
import { composedEnhancer } from './sagas';
import { sagaMiddleware } from './sagas';

export const store = createStore(rootReducer, composedEnhancer);

function* helloWorld(){
    yield store.dispatch({type: 'EMAIL_CHANGE', payload: 'helloWorld@gmail.com'});
}

sagaMiddleware.run(helloWorld);