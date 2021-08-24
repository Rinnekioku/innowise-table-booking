import React from 'react';
import { Checkbox, Button} from 'antd';
import i18n from 'i18next';
import { checkAllName } from '../../constants/checkAllReservations';
import { ColumnsType } from 'antd/lib/table';

const getRoomOrTableNumber = (item: string): string => {
    const namePosition = 0;
    const numberRegExp = /(\d)/;
    const number = item.match(numberRegExp) ?? [];
    return `${1 + Number(number[namePosition])}`;
};

type TableHeaderColumnsType = ColumnsType<{
    key: string;
    checkbox: string;
    removeReservation: string;
    office: string;
    room: string;
    table: string;
    date: string;
    timeInterval: number;
}> | undefined;

type TableHeaderArgsType = (
    removeSelected: () => void,
    removeReservation: (value: string) => void
) => TableHeaderColumnsType

export const TableHeaderConfig: TableHeaderArgsType = (
    removeSelected: () => void,
    removeReservation: (value: string) => void
) => [
    {
        title: (
            <Checkbox value={checkAllName}/>
        ),
        dataIndex: 'checkbox',
        key: 'checkbox',
        // eslint-disable-next-line react/display-name
        render: (value: string) => <Checkbox value={value}/>
    },
    {
        title: i18n.t('reservations.office'),
        dataIndex: 'office',
        key: 'office',
    },
    {
        title: i18n.t('reservations.room'),
        dataIndex: 'room',
        key: 'room',
        render: (room: string) => getRoomOrTableNumber(room),
    },
    {
        title: i18n.t('reservations.table'),
        dataIndex: 'table',
        key: 'table',
        render: (table: string) => getRoomOrTableNumber(table),
    },
    {
        title: i18n.t('reservations.date'),
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: i18n.t('reservations.timeInterval'),
        dataIndex: 'timeInterval',
        key: 'timeInterval',
    },
    {
        title: (
            <Button onClick={removeSelected}>
                {i18n.t('reservations.removeSelected')}
            </Button>
        ),
        dataIndex: 'removeReservation',
        key: 'removeReservation',
        // eslint-disable-next-line react/display-name
        render: (value: string) => (
            <Button onClick={() => {
                removeReservation(value);
            }}>
                {i18n.t('reservations.remove')}
            </Button>
        )
    }
];