import React from 'react';
import { Space, PageHeader } from 'antd';
import { Table } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { TableEntity } from './components/table';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { useTables } from '../../core/hooks/tables';

interface TablePropsEntity{
    routes: Route[],
}

export function Tables(props: TablePropsEntity): JSX.Element {
    const [tablesState, t, routes] = useTables(props.routes);

    if (!tablesState.isLoaded) {
        return (
            <>
                <p>{t('tables.loadingTables')}</p>
            </>
        );
    } else {
        if (tablesState.error) {
            return (
                <>
                    <p>{t('tables.noTablesError')}</p>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('tables.title')}
                        breadcrumb={{routes: routes, itemRender: renderBreadcrumb}}
                    />
                    <Space>
                        {tablesState.tables.map((room: TableEntity) => {
                            return (
                                <Table
                                    key={room.id}
                                    id={room.id}
                                />
                            );
                        })}
                    </Space>
                </>
            );
        }
    }
}
