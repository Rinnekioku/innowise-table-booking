import { useState, useEffect, useContext } from 'react';
import { Moment } from 'moment';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useTimeIntervalsMenu } from './useTimeIntervalsMenu';
import { useBookTable } from './useBookTable';
import { TableDataContext } from '../../../components/tables/components/reducer';
import { TableEntity } from '../../../components/tables/components/table';

interface OkButtonProps {
    disabled: boolean,
}

export function useTableModal(table: TableEntity): [TFunction, (current: Moment) => boolean, () => JSX.Element, () => void, OkButtonProps] {
    const availableTimeMenu = useTimeIntervalsMenu();
    const bookTable = useBookTable(table);
    const { t } = useTranslation();
    const [tableState] = useContext(TableDataContext);
    const [okButtonProps, setOkButtonProps] = useState<OkButtonProps>({disabled: true});

    useEffect(() => {
        if (tableState.date !== '' && tableState.timeInterval !== -1){
            setOkButtonProps({
                disabled: false,
            });
        } else {
            setOkButtonProps({
                disabled: true,
            });
        }
    }, [tableState.date, tableState.timeInterval]);

    const enableSevenDaysOnly = (current: Moment): boolean => {
        const getYesterdayDay = () => {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            return date;
        };
        const getWeekLaterDay = () => {
            const date = new Date();
            date.setDate(date.getDate() + 6);
            return date;
        };
        return current && current.valueOf() < getYesterdayDay().valueOf() || current.valueOf() > getWeekLaterDay().valueOf();
    };

    return [t, enableSevenDaysOnly, availableTimeMenu, bookTable, okButtonProps];
}
