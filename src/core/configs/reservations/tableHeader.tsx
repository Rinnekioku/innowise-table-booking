import React from 'react';
import { Col, Checkbox, Button} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { buttonSize, checkboxSize, reservationBlockSize } from '../../constants/reservationBlockSize';

export const TableHeaderConfig: (onCheckAllChange: (e: CheckboxChangeEvent) => void, checkAll: boolean, removeSelected: () => void) => JSX.Element[] = (onCheckAllChange: (e: CheckboxChangeEvent) => void, checkAll: boolean, removeSelected: () => void) => [
    (
        <Col span={checkboxSize} key={1}>
            <Checkbox onChange={onCheckAllChange} checked={checkAll}/>
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={2}>
            Office
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={3}>
            Room
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={4}>
            Table
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={5}>
            Date
        </Col>
    ),
    (
        <Col span={reservationBlockSize} key={6}>
            Time interval
        </Col>
    ),
    (
        <Col span={buttonSize} key={7}>
            <Button onClick={removeSelected}>
                Remove selected
            </Button>
        </Col>
    ),
];