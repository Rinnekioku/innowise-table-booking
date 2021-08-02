import {combineReducers} from 'redux';
import {authReducer} from './auth';
import { officesReducer } from './offices';

export const rootReducer = combineReducers({
    auth: authReducer,
    offices: officesReducer,
});
