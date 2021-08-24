import { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReservationEntity } from '../../../components/reservations';
import { checkAllName } from '../../constants/checkAllReservations';
import { reservationToString } from '../../constants/reservationToString';
import { db } from '../../firebase';
import { ReservationsStateEntity } from '../../redux/reducers/reservations';
import { ReservationsReducerActions } from '../../redux/reducers/reservations/actions';
import { UserReservationEntity } from '../tables/useBookTable';

export function useDataUpdateSubscription(userReservations: ReservationsStateEntity, userId: string, setPlainOptions: Dispatch<SetStateAction<string[]>>): void {
    const dispatch = useDispatch();

    const getReserved = (reservations: [string, (string | UserReservationEntity)[]][]) => {
        const onlyReserved = reservations.reduce((acc: UserReservationEntity[], item: [string, (string | UserReservationEntity)[]]): UserReservationEntity[] => {
            const reservationsInDay = item[1];
            const date = item[0];
            const valid = reservationsInDay.reduce((acc: ReservationEntity[], item: (string | UserReservationEntity), index: number): ReservationEntity[] => {
                if (typeof item !== 'string') {
                    const reservation: ReservationEntity = {
                        ...item,
                        date: date,
                        timeInterval: index,
                    };
                    return [...acc, reservation];
                } else {
                    return acc;
                }
            }, []);
            return [...acc, ...valid];
        }, []);

        return onlyReserved;
    };
    
    useEffect(() => {
        const userReservationsPath = `users/${userId}`;
        const userReservationsRef = db.ref(userReservationsPath);

        userReservationsRef.on('value', (snapshot) => {
            const data = snapshot.val() ?? [];
            const reserved = getReserved(Object.entries(data));
            dispatch({type: ReservationsReducerActions.sagaLoad, payload: reserved}); 
        });

        return () => {
            userReservationsRef.off('value');
        };
    }, [dispatch, userId]);

    useEffect(() => {
        const plainOptions = [...userReservations.reservations.map((item: ReservationEntity) => {
            return reservationToString(item);
        }), checkAllName];
    
        setPlainOptions(plainOptions);
    }, [userReservations.reservations, setPlainOptions]);
}