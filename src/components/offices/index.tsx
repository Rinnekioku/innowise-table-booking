import React from 'react';
import { Row, Col, PageHeader } from 'antd';
import { Office } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useOffices } from '../../core/hooks/offices';
import {renderBreadcrumb} from '../../core/constants/renderBreadcrumb';
import { Loader } from '../../core/constants/loader';
import { blockMargin, blockSpan, errorAlign, loaderAlign } from '../../core/constants/gridSettings';
import { ErrorBlock } from '../../core/constants/errorBlock';
import { itemsOnPage } from '../../core/constants/itemsOnPage';
import { PaginationSC } from '../../core/styles/pagination';

export interface OfficeEntity {
    id: string,
    name: string,
}

interface OfficesPropsEntity{
    routes: Route[],
}

export function Offices (props: OfficesPropsEntity): JSX.Element {
    const [officesState, t, page, onPageChange, total] = useOffices();

    if (officesState.isLoading) {
        return (
            <>
                <PageHeader
                    title={t('offices.title')}
                    breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                />
                <Row justify={loaderAlign}>
                    <Loader/>
                </Row>
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
                    <Row justify={errorAlign}>
                        <ErrorBlock errorText={t('offices.noOfficesError')}/>
                    </Row>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('offices.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <Row gutter={blockMargin}>
                        {officesState.offices.map((office: OfficeEntity) => {
                            return (
                                <Col span={blockSpan} key={office.id}>
                                    <Office
                                        name={office.name}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                    <Row justify={'center'} align={'bottom'}>
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
