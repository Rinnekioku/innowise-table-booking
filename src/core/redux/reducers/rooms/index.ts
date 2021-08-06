import { RoomEntity } from '../../../../components/rooms/components/room';
import { RoomsReducerActions } from './actions';

export interface RoomsStateEntity {
    isLoaded: boolean,
    error: boolean,
    rooms: RoomEntity[],
}

interface RoomsRemoveAddAction {
    type: RoomsReducerActions.remove | RoomsReducerActions.add,
    payload: RoomEntity,
}

interface RoomsLoadAction {
    type: RoomsReducerActions.load,
    payload: RoomEntity[],
}

export type RoomsActions = RoomsRemoveAddAction | RoomsLoadAction;

const initialState: RoomsStateEntity = {
    isLoaded: false,
    error: false,
    rooms: [],
};

export function roomsReducer(state: RoomsStateEntity = initialState, action: RoomsActions): RoomsStateEntity {
    switch (action.type){
    case RoomsReducerActions.load:
        if (action.payload?.length){
            return {
                ...state,
                isLoaded: true,
                error: false,
                rooms: [...action.payload],
            };
        } else {
            return {
                ...state,
                isLoaded: true,
                error: true,
                rooms: [],
            };
        }
    case RoomsReducerActions.add:
        return {
            ...state,
            rooms: [...state.rooms, action.payload],
        };
    case RoomsReducerActions.remove:
        return {
            ...state,
            rooms: [...state.rooms.filter((item: RoomEntity) => item.id !== action.payload.id)],
        };
    default:
        return state;
    }
}
