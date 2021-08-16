import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { TableDataContextReducerActions } from '../../../components/tables/components/actions';
import { TableDataContext } from '../../../components/tables/components/reducer';
import { charactersToReplaceInDate, daysInWeek, dividerCharacterInDate, fillRestOfWeek, replacerCharacterInDate } from '../../constants/dates';
import { getTablePathInDB } from '../../constants/getTablePathInDB';
import { db } from '../../firebase';

export function useTableReservations (tableId: string): () => void {
    const [, tableDispatch] = useContext(TableDataContext);
    const location = useLocation();

    const validateTableReservations = (reservations: [string[], string[]][]) => {
        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        const validatedReservations = reservations
            .filter((item: [string[], string[]]) => {
                const [itemYear, itemMonth, itemDate] = item[0].map((item: string) => Number(item));
                const isInThePast: boolean = 
                    itemDate >= todayDate && 
                    itemMonth >= todayMonth && 
                    itemYear >= todayYear;
                
                if (isInThePast) {
                    return true;
                }
            })
            .map((item: [string[], string[]]) => {
                const date = item[0];
                const reservationsSchedule = item[1];
                return [
                    date.join(dividerCharacterInDate)
                        .replace(charactersToReplaceInDate, replacerCharacterInDate),
                    reservationsSchedule
                ];
            });

        if (validatedReservations.length !== 0){
            const lastDayStringFromDB = validatedReservations[validatedReservations.length -1][0];
            const lastDayDate = new Date(lastDayStringFromDB as string);
            const extendedReservations = validatedReservations.concat(fillRestOfWeek(lastDayDate,daysInWeek - validatedReservations.length));

            return extendedReservations;
        } else {
            const extendedReservations = fillRestOfWeek();

            return extendedReservations;
        }
    };

    const getTableReservationSchedule = async () => {
        const tablePath = getTablePathInDB(location.pathname, tableId);
        const tableReservationRef = db.ref(tablePath);
        const tableScheduleSnapshot = await tableReservationRef.get();
        const data = tableScheduleSnapshot.val();
        const reservations: [string[], unknown][] = Object.entries(data as ArrayLike<unknown>).map((item: [string, unknown]) => {
            const date = item[0].split(dividerCharacterInDate);
            const reservationsSchedule = item[1];
            return [
                date,
                reservationsSchedule,
            ];
        });
        const validatedReservations = validateTableReservations(reservations as [string[], string[]][]);
        const reservationsScheduleMap = new Map (validatedReservations as [string, string[]][]);
        
        tableDispatch({type: TableDataContextReducerActions.setSchedule, payload: reservationsScheduleMap});
    };

    return getTableReservationSchedule;
}