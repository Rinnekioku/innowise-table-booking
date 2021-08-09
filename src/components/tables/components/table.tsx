import React from 'react';
import { Card, Button } from 'antd';

export interface TableEntity {
    id: string,
}

export function Table(props: TableEntity): JSX.Element {
    return(
        <Card>
            {props.id}<br/>
            <Button>
                View room
            </Button>
        </Card>
    );
}
