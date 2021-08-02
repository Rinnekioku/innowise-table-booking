import React from 'react';
import { Card, Button } from 'antd';

export interface OfficeEntity {
    id: string,
    name: string,
}

export function Office(props: OfficeEntity): JSX.Element {
    return(
        <Card id={props.id}>
            {props.name}<br/>
            <Button>View office</Button>
        </Card>
    );
}
