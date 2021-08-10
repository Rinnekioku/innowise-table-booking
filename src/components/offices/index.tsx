import React from 'react';
import { Row, Col, PageHeader } from 'antd';
import { Office } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useOffices } from '../../core/hooks/offices';
import {renderBreadcrumb} from '../../core/constants/renderBreadcrumb';
import { Loader } from '../../core/constants/loader';
import { blockMargin, blockSpan, errorAlign, loaderAlign } from '../../core/constants/gridSettings';
import { ErrorBlock } from '../../core/constants/errorBlock';

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
                </>
            );
        }
    }
}
