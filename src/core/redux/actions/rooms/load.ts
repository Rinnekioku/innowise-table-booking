import { RoomsReducerActions } from '../../reducers/rooms/actions';
import { RoomsActions } from '../../reducers/rooms';
import { RoomEntity } from '../../../../components/rooms/components/room';

export function loadRoomsAction(payload: RoomEntity[]): RoomsActions{
    return {
        type: RoomsReducerActions.load,
        payload: payload
    };
}
