import React from 'react';
import { Card, Button } from 'antd';
import { usePlaceToPlace } from '../../../core/hooks/rediricts/usePlaceToPlace';

export interface RoomEntity {
    id: string,
    name: string,
}

export function Room(props: RoomEntity): JSX.Element {
    const [goToRoom, t] = usePlaceToPlace(`${props.id}/tables`);

    return(
        <Card title={props.name}>
            <Button
                onClick={goToRoom}
            >
                {t('rooms.viewRoom')}
            </Button>
        </Card>
    );
}
