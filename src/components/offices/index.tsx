import React from 'react';
import { Space, PageHeader } from 'antd';
import { Office } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useOffices } from '../../core/hooks/offices';
import {renderBreadcrumb} from '../../core/constants/renderBreadcrumb';

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
                <PageHeader
                    title={t('offices.title')}
                    breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                />
                <p>{t('offices.loadingOffices')}</p>
            </>
        );
    } else {
        if (officesState.error) {
            return (
                <>
                    <PageHeader
                        title={t('offices.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <p>{t('offices.noOfficesError')}</p>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('offices.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
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
