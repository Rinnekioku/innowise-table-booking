import React from 'react';
import { Space, PageHeader } from 'antd';
import { Office } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export interface OfficeEntity {
    id: string,
    name: string,
}

interface OfficesPropsEntity{
    routes: Route[],
}

export function Offices(props: OfficesPropsEntity){
    const offices = useSelector((state: any) => state.offices);
    const { t } = useTranslation();

    return (
        <>
            <PageHeader
                title='Offices'
                breadcrumb={{routes: props.routes}}
            />
            {
                !offices.isLoaded ? <p>{t('offices.loadingOffices')}</p> : 
                    offices.error ? <p>{t('offices.noOfficesError')}</p> :
                        <Space>
                            {offices.offices.map((office: OfficeEntity) => {
                                return (
                                    <Office
                                        key={office.id}
                                        name={office.name}
                                    />
                                );
                            })}
                        </Space>
            }   
        </>
    );
}
