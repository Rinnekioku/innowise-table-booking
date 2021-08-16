import React, { useState, useEffect, useContext } from 'react';
import { Menu ,Button } from 'antd';
import { TableDataContextReducerActions } from '../../../components/tables/components/actions';
import { TableDataContext } from '../../../components/tables/components/reducer';
import { scheduleTime } from '../../constants/scheduleTime';
import { availableTimeTag } from '../../constants/tableBookingTags';
import { useTranslation } from 'react-i18next';


export function useTimeIntervalsMenu(): () => JSX.Element {
    const [tableState, tableDispatch] = useContext(TableDataContext);
    const { t } = useTranslation();
    const [timeIntervals, setTimeIntervals] = useState<JSX.Element[]>();

    const removeUnavailableTimeIntervals = (date: string) => {
        const availableTimeIntervals = tableState.schedule?.get(date)
            ?.reduce((acc: JSX.Element[], item: string, index: number): JSX.Element[] => {
                const timeInterval = scheduleTime[index];
                if (item === availableTimeTag) {
                    return [...acc,(
                        <Menu.Item key={index}>
                            <Button onClickCapture={() => {
                                tableDispatch({type: TableDataContextReducerActions.setTimeInterval, payload: index});
                            }}>
                                {timeInterval}
                            </Button>
                        </Menu.Item>
                    )];
                } else {
                    return acc;
                }
            }, []);

        setTimeIntervals(availableTimeIntervals);
    };

    useEffect(() => {
        removeUnavailableTimeIntervals(tableState.date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableState.date]);
    const availableTimeMenu = () => {
        return (
            <Menu>
                {timeIntervals && timeIntervals?.length !== 0 ? 
                    timeIntervals :
                    (
                        <Menu.Item key={1}>
                            {t('book.tableUnavailable')}
                        </Menu.Item>
                    )
                }
            </Menu>
        );
    };

    return availableTimeMenu;
}