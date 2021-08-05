import React from 'react';
import { Card, Button } from 'antd';
import { useOfficeToRooms } from '../../../core/hooks/offices';

interface OfficePropsEntity {
    name: string,
}

export function Office(props: OfficePropsEntity): JSX.Element {
    const goToOffice = useOfficeToRooms(props.name);

    return(
        <Card>
            {props.name}<br/>
            <Button
                onClick={goToOffice}
            >
                View office
            </Button>
        </Card>
    );
}
