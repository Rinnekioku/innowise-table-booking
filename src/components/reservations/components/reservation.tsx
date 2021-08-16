import React from 'react';
import { Card, Row, Col, Checkbox, Button } from 'antd';
import { ReservationEntity } from '..';
import { scheduleTime } from '../../../core/constants/scheduleTime';
import { reservationBlockSize, checkboxSize, reservationGutter, buttonSize } from '../../../core/constants/reservationBlockSize';
import { db } from '../../../core/firebase';
import { availableTimeTag } from '../../../core/constants/tableBookingTags';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/redux';
import firebase from 'firebase';

interface ReservationPropsEntity extends ReservationEntity {
    value: string,
    removeReservation: (value: string) => void, 
}

export function Reservation(props: ReservationPropsEntity): JSX.Element {
    const {office, room, table, date, timeInterval, value, removeReservation} = props;
    const userId = useSelector((state: RootState) => state.auth.userId);
    const { t } = useTranslation();

    return (
        <Card>
            <Row gutter={reservationGutter}>
                <Col span={checkboxSize}>
                    <Checkbox value={value}/>
                </Col>
                <Col span={reservationBlockSize}>
                    {`${office}`}
                </Col>
                <Col span={reservationBlockSize}>
                    {`${room}`}
                </Col>
                <Col span={reservationBlockSize}>
                    {`${table}`}
                </Col>
                <Col span={reservationBlockSize}>
                    {`${date}`}
                </Col>
                <Col span={reservationBlockSize}>
                    {`${scheduleTime[timeInterval]}`}
                </Col>
                <Col span={buttonSize}>
                    <Button onClick={() => {
                        removeReservation(value);
                    }}>
                        {t('reservations.remove')}
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}
