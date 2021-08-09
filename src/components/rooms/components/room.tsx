import React from 'react';
import { Card, Button } from 'antd';
import { useRoomToTables } from '../../../core/hooks/rooms';

export interface RoomEntity {
    id: string,
}

export function Room(props: RoomEntity): JSX.Element {
    const [goToRoom, t] = useRoomToTables(props.id);

    return(
        <Card>
            {props.id}<br/>
            <Button
                onClick={goToRoom}
            >
                {t('rooms.viewRoom')}
            </Button>
        </Card>
    );
}
