import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { Dispatch, SetStateAction, useState } from 'react';
import { ReservationEntity } from '../../../components/reservations';
import { checkAllName } from '../../constants/checkAllReservations';
import { reservationToString } from '../../constants/reservationToString';
import { ReservationsStateEntity } from '../../redux/reducers/reservations';

export function useCheckboxGroup(userReservations: ReservationsStateEntity): [CheckboxValueType[], Dispatch<SetStateAction<string[]>>, (list: CheckboxValueType[]) => void] {
    const [plainOptions, setPlainOptions] = useState<string[]>(
        [...userReservations.reservations.map((item: ReservationEntity) => {
            return reservationToString(item);
        }), checkAllName]
    );
    const isCheckAllChecked = (list: CheckboxValueType[]) => {
        const allCheckboxesQuantity = plainOptions.length - 1;
        const checkAll = isCurrentHasCheckAll(list);
        //checking checkbox all condition
        if (checkAll) {
            //checking do all reservations checked
            if (list.length <= allCheckboxesQuantity) {
                //checked previous change all check box condition and quantity of checked checkboxes
                if (isPrevHadCheckAll() && list.length === allCheckboxesQuantity) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            //checking if user unchecked all checkbox
            if (list.length === allCheckboxesQuantity && !isPrevHadCheckAll()) {
                return true;
            } else {
                return false;
            }
        } 
    };

    const isCurrentHasCheckAll = (list: CheckboxValueType[]) => {
        if (list.indexOf(checkAllName) !== -1){
            return true;
        } else {
            return false;
        }
    };

    const isPrevHadCheckAll = () => {
        if (checkedList.indexOf(checkAllName) !== -1){
            return true;
        } else {
            return false;
        }
    };

    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
    const onChange = (list: CheckboxValueType[]) => {
        if (isCheckAllChecked(list)) {
            setCheckedList(plainOptions);
        } else {
            if (isPrevHadCheckAll() && !isCurrentHasCheckAll(list)) {
                setCheckedList([]);
            } else {
                setCheckedList(list.filter(item => item !== checkAllName));
            }
        }
    };

    return [checkedList, setPlainOptions, onChange];
}