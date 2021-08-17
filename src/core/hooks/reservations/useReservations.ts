import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { TFunction, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReservationEntity } from '../../../components/reservations';
import { RootState } from '../../redux';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ReservationsStateEntity } from '../../redux/reducers/reservations';
import { reservationToString } from '../../constants/reservationToString';
import { useCheckboxGroup } from './useCheckboxGroup';
import { useRemoveReservation } from './useRemoveReservation';
import { useDataUpdateSubscription } from './useDataUpdateSubscription';


export function useReservations(): [TFunction, ReservationsStateEntity, (list: CheckboxValueType[]) => void, CheckboxValueType[], (e: CheckboxChangeEvent) => void, boolean, () => void, (value: string) => Promise<unknown>, (item: ReservationEntity) => string] {
    const userId = useSelector((state: RootState) => state.auth.userId);
    const userReservations = useSelector((state: RootState) => state.reservations);
    const [checkedList, checkAll, setPlainOptions, onChange, onCheckAllChange] = useCheckboxGroup(userReservations);
    const removeReservation = useRemoveReservation(userId);
    const { t } = useTranslation();

    useDataUpdateSubscription(userReservations, userId, setPlainOptions);

    const removeSelected = () => {
        checkedList.forEach((item: CheckboxValueType) => {
            removeReservation(item as string);
        });
    };
    
    return [t, userReservations, onChange, checkedList, onCheckAllChange, checkAll, removeSelected, removeReservation, reservationToString];
}