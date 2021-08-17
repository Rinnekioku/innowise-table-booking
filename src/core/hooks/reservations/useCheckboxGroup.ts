import { CheckboxChangeEvent, CheckboxChangeEventTarget } from 'antd/lib/checkbox/Checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { Dispatch, SetStateAction, useState } from 'react';
import { ReservationEntity } from '../../../components/reservations';
import { reservationToString } from '../../constants/reservationToString';
import { ReservationsStateEntity } from '../../redux/reducers/reservations';

export function useCheckboxGroup(userReservations: ReservationsStateEntity): [CheckboxValueType[], boolean, Dispatch<SetStateAction<string[]>>, (list: CheckboxValueType[]) => void, (e: CheckboxChangeEvent) => void] {
    const [plainOptions, setPlainOptions] = useState<string[]>(
        userReservations.reservations.map((item: ReservationEntity) => {
            return reservationToString(item);
        })
    );
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        const eventTarget: CheckboxChangeEventTarget = e.target;
        setCheckedList(eventTarget.checked ? plainOptions : []);
        setCheckAll(eventTarget.checked);
    };

    return [checkedList, checkAll, setPlainOptions, onChange, onCheckAllChange];
}