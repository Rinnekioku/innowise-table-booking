import { Dispatch, SetStateAction, useState } from 'react';
import { TableEntity } from '../../../components/tables/components/table';
import { useTableReservations } from './useTableReservations';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

export function useTable(table: TableEntity): [TFunction, boolean, Dispatch<SetStateAction<boolean> >, () => void] {
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation();
    const getTableReservationSchedule = useTableReservations(table.id);

    const showModal = () => {
        setVisible(true);
        getTableReservationSchedule();
    };

    return [t, visible, setVisible, showModal];
}