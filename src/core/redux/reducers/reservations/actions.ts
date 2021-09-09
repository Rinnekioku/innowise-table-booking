import { ReservationEntity } from '../../../../components/reservations';

export enum ReservationsReducerActions {
    sagaLoad = 'LOAD_RESERVATIONS_SAGA',
    loadReservations = 'LOAD_RESERVATIONS',
    error = 'HANDLE_RESERVATIONS_ERROR',
    loading = 'HANDLE_RESERVATIONS_LOAD',
    dropSaga = 'DROP_RESERVATIONS_SAGA',
    drop = 'DROP_RESERVATIONS',
}

interface ReservationsLoadAction {
    type: ReservationsReducerActions.loadReservations,
    payload: ReservationEntity[],
}

interface ReservationsLoadHandleAction {
    type: ReservationsReducerActions.loading,
    payload: boolean
}

interface ReservationsErrorAction {
    type: ReservationsReducerActions.error
    payload: boolean,
}

interface ReservationsDropAction {
    type: ReservationsReducerActions.drop,
    payload: undefined,
}

export type ReservationsActionsType = 
    ReservationsLoadAction |
    ReservationsLoadHandleAction |
    ReservationsErrorAction |
    ReservationsDropAction;
