import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { officesReducer } from './offices';
import { roomsReducer } from './rooms';

export const rootReducer = combineReducers({
    auth: authReducer,
    offices: officesReducer,
    rooms: roomsReducer,
});
