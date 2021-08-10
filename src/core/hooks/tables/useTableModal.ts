import { useState } from 'react';
import { Moment } from 'moment';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

export function useTableModal(): [TFunction, () => void, boolean, () => void, () => void, (current: Moment) => boolean] {
    const [visible, setVisible] = useState<boolean>(false);
    const { t } = useTranslation();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

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

    return [t, showModal, visible, handleOk, handleCancel, enableSevenDaysOnly];
}
