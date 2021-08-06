import React from 'react';
import { Card, Button } from 'antd';
import { useRoomToTables } from '../../../core/hooks/rooms';

export interface RoomEntity {
    id: string,
}

export function Room(props: RoomEntity): JSX.Element {
    const goToRoom = useRoomToTables(props.id);

    return(
        <Card>
            {props.id}<br/>
            <Button
                onClick={goToRoom}
            >
                View room
            </Button>
        </Card>
    );
}
