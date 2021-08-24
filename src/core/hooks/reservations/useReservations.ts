import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { TFunction, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReservationEntity } from '../../../components/reservations';
import { RootState } from '../../redux';
import { ReservationsStateEntity } from '../../redux/reducers/reservations';
import { reservationToString } from '../../constants/reservationToString';
import { useCheckboxGroup } from './useCheckboxGroup';
import { useRemoveReservation } from './useRemoveReservation';
import { useDataUpdateSubscription } from './useDataUpdateSubscription';


export function useReservations(): [TFunction, ReservationsStateEntity, (list: CheckboxValueType[]) => void, CheckboxValueType[], () => void, (value: string) => Promise<void>, (item: ReservationEntity) => string] {
    const userId = useSelector((state: RootState) => state.auth.userId);
    const userReservations = useSelector((state: RootState) => state.reservations);
    const [checkedList, setPlainOptions, onChange] = useCheckboxGroup(userReservations);
    const removeReservation = useRemoveReservation(userId);
    const { t } = useTranslation();

    useDataUpdateSubscription(userReservations, userId, setPlainOptions);

    const removeSelected = () => {
        checkedList.forEach((item: CheckboxValueType) => {
            removeReservation(item as string);
        });
    };
    
    return [t, userReservations, onChange, checkedList, removeSelected, removeReservation, reservationToString];
}