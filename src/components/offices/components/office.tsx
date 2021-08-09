import React from 'react';
import { Card, Button } from 'antd';
import { usePlaceToPlace } from '../../../core/hooks/rediricts/usePlaceToPlace';

interface OfficePropsEntity {
    name: string,
}

export function Office(props: OfficePropsEntity): JSX.Element {
    const [goToOffice, t] = usePlaceToPlace(`${props.name}/rooms`);

    return(
        <Card>
            {props.name}<br/>
            <Button
                onClick={goToOffice}
            >
                {t('offices.viewOffice')}
            </Button>
        </Card>
    );
}
