import React from 'react';
import { Col, Checkbox, Button} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { buttonSize, checkboxSize, reservationBlockSize } from '../../constants/reservationBlockSize';
import i18n from 'i18next';

export const TableHeaderConfig: (onCheckAllChange: (e: CheckboxChangeEvent) => void, checkAll: boolean, removeSelected: () => void) => JSX.Element[] = (onCheckAllChange: (e: CheckboxChangeEvent) => void, checkAll: boolean, removeSelected: () => void) => [
    (
        <Col span={checkboxSize} key={1}>
            <Checkbox onChange={onCheckAllChange} checked={checkAll}/>
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={2}>
            {i18n.t('reservations.office')}
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={3}>
            {i18n.t('reservations.room')}
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={4}>
            {i18n.t('reservations.table')}
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={5}>
            {i18n.t('reservations.date')}
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={6}>
            {i18n.t('reservations.timeInterval')}
        </Col>
    ),
    (
        <Col span={buttonSize} key={7}>
            <Button onClick={removeSelected}>
                {i18n.t('reservations.removeSelected')}
            </Button>
        </Col>
    ),
];