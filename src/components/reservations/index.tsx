import React from 'react';
import { Row, Col, PageHeader, Card} from 'antd';
import { Reservation } from './components/reservation';
import { reservationGutter, reservationsGutter, reservationSize } from '../../core/constants/reservationBlockSize';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { TableHeaderConfig } from '../../core/configs/reservations/tableHeader';
import { Loader } from '../../core/constants/loader';
import { ErrorBlock } from '../../core/constants/errorBlock';
import { useReservations } from '../../core/hooks/reservations/useReservations';
import { CheckboxGroupSC } from './components/styled';

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
    const [t, userReservations, onChange, checkedList, onCheckAllChange, checkAll, removeSelected, removeReservation, reservationToString] = useReservations();
    
    if (userReservations.isLoading){
        return (
            <>
                <PageHeader
                    title={t('reservations.title')}
                    breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                />
                <Loader/>
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
                    <ErrorBlock errorText={t('reservations.error')}/>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('reservations.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <Row gutter={reservationsGutter}>
                        <Col span={reservationSize}>
                            <Card>
                                <Row gutter={reservationGutter} wrap>
                                    {TableHeaderConfig(onCheckAllChange, checkAll, removeSelected)}
                                </Row>
                            </Card>
                        </Col>
                        
                        <CheckboxGroupSC value={checkedList} onChange={onChange}>
                            {userReservations.reservations.map((item: ReservationEntity) => {
                                const value = reservationToString(item);
                                return (
                                    <Col key={value} span={reservationSize}>
                                        <Reservation
                                            value={value}
                                            removeReservation={removeReservation}
                                            {...item}
                                        />
                                    </Col>
                                );
                            })}
                        </CheckboxGroupSC>
                    </Row>
                </>
            );
        }
    }
}
