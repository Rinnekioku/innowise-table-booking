import React from 'react';
import { Row, Col, PageHeader } from 'antd';
import { Table } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { TableEntity } from './components/table';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { useTables } from '../../core/hooks/tables';
import { Loader } from '../../core/constants/loader';
import { blockMargin, blocksJustify, errorAlign, loaderAlign, paginationAlign } from '../../core/constants/gridSettings';
import { ErrorBlock } from '../../core/constants/errorBlock';
import { TableDataContext} from './components/reducer';
import { itemsOnPage } from '../../core/constants/itemsOnPage';
import { PaginationSC } from '../../core/styles/pagination';
import { SearchBar } from '../searchbar';
import { useResponsiveGrid } from '../../core/hooks/responsive/useResponsiveGrid';

interface TablePropsEntity{
    routes: Route[],
}

export function Tables(props: TablePropsEntity): JSX.Element {
    const [tablesState, t, routes, tableState, tableDispatch, page, onPageChange, total, searchBar, onSearchBarChange] = useTables(props.routes);
    const colSpan = useResponsiveGrid();
    

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
                        <Row gutter={blockMargin} justify={blocksJustify}>
                            <Col span={24}>
                                <SearchBar onChange={onSearchBarChange} type='tables'/>
                            </Col>
                            {tablesState.tables.map((table: TableEntity) => {
                                if (searchBar !== ''){
                                    if (table.name.match(searchBar.trim())) {
                                        return (
                                            <Col span={colSpan} key={table.id}>
                                                <Table
                                                    table={table}
                                                />
                                            </Col>
                                        );
                                    } else {
                                        return null;
                                    }
                                } else {
                                    return (
                                        <Col span={colSpan} key={table.id}>
                                            <Table
                                                table={table}
                                            />
                                        </Col>
                                    ); 
                                }
                            })}
                        </Row>
                    </TableDataContext.Provider>
                    <Row justify={blocksJustify} align={paginationAlign}>
                        <PaginationSC
                            current={page}
                            defaultPageSize={itemsOnPage}
                            showSizeChanger={false}
                            onChange={onPageChange}
                            total={total}
                        />
                    </Row>
                </>
            );
        }
    }
}
