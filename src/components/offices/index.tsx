import React from 'react';
import { Space, PageHeader } from 'antd';
import { Office } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useOffices } from '../../core/hooks/offices';

export interface OfficeEntity {
    id: string,
    name: string,
}

interface OfficesPropsEntity{
    routes: Route[],
}

export function Offices (props: OfficesPropsEntity): JSX.Element {
    const [officesState, t] = useOffices();   

    if (!officesState.isLoaded) {
        return (
            <>
                <p>{t('offices.loadingOffices')}</p>
            </>
        );
    } else {
        if (officesState.error) {
            return (
                <>
                    <p>{t('offices.noOfficesError')}</p>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title='Offices'
                        breadcrumb={{routes: props.routes}}
                    />
                    <Space>
                        {officesState.offices.map((office: OfficeEntity) => {
                            return (
                                <Office
                                    key={office.id}
                                    name={office.name}
                                />
                            );
                        })}
                    </Space>
                </>
            );
        }
    }
}
