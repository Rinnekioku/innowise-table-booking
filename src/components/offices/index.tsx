import React from 'react';
import {Space, PageHeader} from 'antd';
import {OfficeEntity, Office} from './components/office';
import {Route} from 'antd/lib/breadcrumb/Breadcrumb';
import { useSelector } from 'react-redux';

interface OfficesEntity{
    routes: Route[],
}

export function Offices(props: OfficesEntity){
    const offices = useSelector((state: any) => state.offices);
    
    return (
        <>
            <PageHeader
                title='Offices'
                breadcrumb={{routes: props.routes}}
            />
            <Space>
                {offices.map((office: OfficeEntity) => {
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
