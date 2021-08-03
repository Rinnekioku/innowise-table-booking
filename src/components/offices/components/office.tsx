import React from 'react';
import { Card, Button } from 'antd';
import { useHistory } from 'react-router-dom';

interface OfficePropsEntity {
    name: string,
}

export function Office(props: OfficePropsEntity): JSX.Element {
    const history = useHistory();

    return(
        <Card>
            {props.name}<br/>
            <Button
                onClick={() =>{
                    history.push(`${props.name}/rooms`);
                }}
            >
                View office
            </Button>
        </Card>
    );
}
