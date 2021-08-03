import React from 'react';
import { Card, Button } from 'antd';
import { useHistory } from 'react-router-dom';

export interface OfficeEntity {
    id: string,
    name: string,
}

export function Office(props: OfficeEntity): JSX.Element {
    const history = useHistory();

    return(
        <Card>
            {props.name}<br/>
            <Button
                onClick={() =>{
                    history.push(`${props.id}/rooms`);
                }}
            >
                View office
            </Button>
        </Card>
    );
}
