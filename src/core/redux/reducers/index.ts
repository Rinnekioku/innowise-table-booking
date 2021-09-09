import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { officesReducer } from './offices';
import { reservationsReducer } from './reservations';
import { roomsReducer } from './rooms';
import { tablesReducer } from './tables';

export const rootReducer = combineReducers({
    auth: authReducer,
    offices: officesReducer,
    rooms: roomsReducer,
    tables: tablesReducer,
    reservations: reservationsReducer,
});
