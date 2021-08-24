import React from 'react';
import { Row, PageHeader, Table} from 'antd';
import { reservationsGutter } from '../../core/constants/reservationBlockSize';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { TableHeaderConfig } from '../../core/configs/reservations/tableHeader';
import { Loader } from '../../core/constants/loader';
import { ErrorBlock } from '../../core/constants/errorBlock';
import { useReservations } from '../../core/hooks/reservations/useReservations';
import { CheckboxGroupSC } from './components/styled';
import { blocksJustify, errorAlign, loaderAlign } from '../../core/constants/gridSettings';

export interface ReservationEntity {
    office: string,
    room: string,
    table: string,
    date: string,
    timeInterval: number,
}

export interface ReservationsPropsEntity {
    routes: Route[],
}

export function Reservations(props: ReservationsPropsEntity): JSX.Element {
    const [
        t, 
        userReservations,
        onChange,
        checkedList,
        removeSelected, 
        removeReservation,
        reservationToString
    ] = useReservations();

    const formReservations = (reservations: ReservationEntity[]) => {
        return reservations.map((item: ReservationEntity) => {
            const value = reservationToString(item);
            return {
                ...item,
                key: value,
                checkbox: value,
                removeReservation: value,
                        
            };
        });
    };
    
    if (userReservations.isLoading){
        return (
            <>
                <PageHeader
                    title={t('reservations.title')}
                    breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                />
                <Row justify={loaderAlign}>
                    <Loader/>
                </Row>
            </>
        );
    } else {
        if (userReservations.error){
            return (
                <>
                    <PageHeader
                        title={t('reservations.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />

                    <Row justify={errorAlign}>
                        <ErrorBlock errorText={t('reservations.error')}/>
                    </Row>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('reservations.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <Row gutter={reservationsGutter} justify={blocksJustify}>
                        <CheckboxGroupSC value={checkedList} onChange={onChange}>
                            <Table 
                                columns={TableHeaderConfig(removeSelected, removeReservation)}
                                dataSource={formReservations(userReservations.reservations)}
                                pagination={false}
                                scroll={{x: 1000}}
                                bordered
                            />
                        </CheckboxGroupSC>
                    </Row>
                </>
            );
        }
    }
}
