import React from 'react';
import {Space, PageHeader} from 'antd';
import {OfficeEntity, Office} from './components';
import {Route} from 'antd/lib/breadcrumb/Breadcrumb';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface OfficesEntity{
    routes: Route[],
}

export function Offices(props: OfficesEntity){
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
                                        id={office.id}
                                        name={office.name}
                                    />
                                );
                            })}
                        </Space>
            }   
        </>
    );
}
