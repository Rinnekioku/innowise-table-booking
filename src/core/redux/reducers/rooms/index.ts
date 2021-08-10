import { RoomEntity } from '../../../../components/rooms/components/room';
import { RoomsReducerActions } from './actions';
import { RoomsActionsType } from './actions';

export interface RoomsStateEntity {
    isLoading: boolean,
    error: boolean,
    rooms: RoomEntity[],
}

const initialState: RoomsStateEntity = {
    isLoading: true,
    error: false,
    rooms: [],
};

export function roomsReducer(state: RoomsStateEntity = initialState, action: RoomsActionsType): RoomsStateEntity {
    switch (action.type){
    case RoomsReducerActions.loadRooms:
        if (action.payload?.length){
            return {
                ...state,
                rooms: [...action.payload],
            };
        } else {
            return {
                ...state,
                rooms: [],
            };
        }
    case RoomsReducerActions.drop:
        return {
            ...state,
            rooms: []
        };
    case RoomsReducerActions.loading:
        return {
            ...state,
            isLoading: action.payload,
        };
    case RoomsReducerActions.error:
        return {
            ...state,
            error: action.payload,
        };
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
