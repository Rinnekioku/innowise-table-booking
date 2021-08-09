import React from 'react';
import { Card, Button } from 'antd';
import { usePlaceToPlace } from '../../../core/hooks/rediricts/usePlaceToPlace';

export interface RoomEntity {
    id: string,
}

export function Room(props: RoomEntity): JSX.Element {
    const [goToRoom, t] = usePlaceToPlace(`${props.id}/tables`);

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
