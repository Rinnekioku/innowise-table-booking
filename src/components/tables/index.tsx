import React from 'react';
import { Row, Col, PageHeader } from 'antd';
import { Table } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { TableEntity } from './components/table';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { useTables } from '../../core/hooks/tables';
import { Loader } from '../../core/constants/loader';
import { blockMargin, blockSpan, errorAlign, loaderAlign } from '../../core/constants/gridSettings';
import { ErrorBlock } from '../../core/constants/errorBlock';
import { TableDataContext} from './components/reducer';

interface TablePropsEntity{
    routes: Route[],
}

export function Tables(props: TablePropsEntity): JSX.Element {
    const [tablesState, t, routes, tableState, tableDispatch] = useTables(props.routes);

    if (tablesState.isLoading) {
        return (
            <>
                <PageHeader
                    title={t('tables.title')}
                    breadcrumb={{routes: routes, itemRender: renderBreadcrumb}}
                />
                <Row justify={loaderAlign}>
                    <Loader/>
                </Row>
            </>
        );
    } else {
        if (tablesState.error) {
            return (
                <>
                    <PageHeader
                        title={t('tables.title')}
                        breadcrumb={{routes: routes, itemRender: renderBreadcrumb}}
                    />
                    <Row justify={errorAlign}>
                        <ErrorBlock errorText={t('tables.noTablesError')}/>
                    </Row>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('tables.title')}
                        breadcrumb={{routes: routes, itemRender: renderBreadcrumb}}
                    />
                    <TableDataContext.Provider value={[tableState, tableDispatch]}>
                        <Row gutter={blockMargin}>
                            {tablesState.tables.map((table: TableEntity) => {
                                return (
                                    <Col span={blockSpan} key={table.id}>
                                        <Table
                                            table={table}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </TableDataContext.Provider>

                </>
            );
        }
    }
}
