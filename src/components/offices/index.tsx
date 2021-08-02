import React from 'react';
import {Space, Card, Button, PageHeader} from 'antd';
import {OfficeEntity, Office} from './components/office';
import {Route} from 'antd/lib/breadcrumb/Breadcrumb';

interface OfficesEntity{
    offices: OfficeEntity[],
    routes: Route[],
}

export function Offices(props: OfficesEntity){
    return (
        <>
            <PageHeader
                title='Offices'
                breadcrumb={{routes: props.routes}}
            />
            <Space>
                {props.offices.map((office: OfficeEntity) => {
                    return (
                        <Office
                            key={office.id}
                            id={office.id}
                            name={office.name}
                        />
                    );
                })}
            </Space>
        </>
    );
}
