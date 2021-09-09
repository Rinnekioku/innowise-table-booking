import { RoomEntity } from '../../../../components/rooms/components/room';

export enum RoomsReducerActions {
    sagaLoad = 'LOAD_ROOMS_SAGA',
    loadRooms = 'LOAD_ROOMS',
    remove = 'REMOVE_ROOM',
    add = 'ADD_ROOM',
    error = 'HANDLE_ROOMS_ERROR',
    loading = 'HANDLE_ROOMS_LOAD',
    sagaDrop = 'DROP_ROOMS_SAGA',
    drop = 'DROP_ROOMS'
}

interface RoomsRemoveAddAction {
    type: RoomsReducerActions.remove | RoomsReducerActions.add,
    payload: RoomEntity,
}

interface RoomsLoadAction {
    type: RoomsReducerActions.loadRooms,
    payload: RoomEntity[],
}

interface RoomsLoadHandleAction {
    type: RoomsReducerActions.loading,
    payload: boolean,
}

interface RoomsErrorHandleAction {
    type: RoomsReducerActions.error,
    payload: boolean,
}

interface RoomsDropAction {
    type: RoomsReducerActions.drop,
    payload: undefined,
}

export type RoomsActionsType = 
    RoomsRemoveAddAction |
    RoomsLoadAction |
    RoomsLoadHandleAction |
    RoomsErrorHandleAction |
    RoomsDropAction;
    