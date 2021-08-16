import { ReservationEntity } from '../../../../components/reservations';
import { ReservationsActionsType, ReservationsReducerActions } from './actions';

export interface ReservationsStateEntity {
    reservations: ReservationEntity[],
    isLoading: boolean,
    error: boolean,
}

const initialState: ReservationsStateEntity = {
    reservations: [],
    isLoading: true,
    error: false,
};

export function reservationsReducer(state: ReservationsStateEntity = initialState, action: ReservationsActionsType): ReservationsStateEntity {
    switch (action.type) {
    case ReservationsReducerActions.loadReservations:
        return {
            ...state,
            reservations: action.payload
        };
    case ReservationsReducerActions.loading: 
        return {
            ...state,
            isLoading: action.payload,
        };
    case ReservationsReducerActions.error:
        return {
            ...state,
            error: action.payload
        };
    case ReservationsReducerActions.drop:
        return {
            ...state,
            reservations: initialState.reservations,
        };
    default: 
        return state;
    }
}
