import { message } from 'antd';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { TableDataContext } from '../../../components/tables/components/reducer';
import { emptyReservations } from '../../constants/dates';
import { unavailableTimeTag } from '../../constants/tableBookingTags';
import { db } from '../../firebase';
import { RootState } from '../../redux';
import { useTranslation } from 'react-i18next';
import { getTablePathInDB } from '../../constants/getTablePathInDB';
import { TableEntity } from '../../../components/tables/components/table';
import { useLocation } from 'react-router-dom';

export function useBookTable(table: TableEntity): () => void {
    const userId: string = useSelector((state: RootState) => state.auth.userId);
    const location = useLocation();
    const { t } = useTranslation();
    const [tableState, ] = useContext(TableDataContext);

    const bookTable = async () => {
        const tablePath = getTablePathInDB(location.pathname, table.id);
        const tableReservationRef = db.ref(tablePath);
        const userReservationsPath = `users/${userId}/${tableState.date}`;
        const userReservationsRef = db.ref(userReservationsPath);

        const userDataSnapshot = await userReservationsRef.get();
        const userData = userDataSnapshot.val();
        const ableToBook = userData ? userData[tableState.timeInterval] === unavailableTimeTag : true;
        
        if (ableToBook){
            const tableScheduleWithBookedTable = new Map(tableState.schedule);
            const reservationsInPickedDay = tableScheduleWithBookedTable.get(tableState.date) ?? emptyReservations;
            const reservationsWithReservedTable = (reservationsInPickedDay).map((item, index) => {
                if (index === tableState.timeInterval){
                    return userId;
                } else {
                    return item;
                }
            });
            //set table booked locally in map object
            tableScheduleWithBookedTable.set(tableState.date, reservationsWithReservedTable);

            const userReservationsOnPickedDate = tableScheduleWithBookedTable.get(tableState.date);
            const objectFromTableScheduleEntries = Object.fromEntries(tableScheduleWithBookedTable.entries());
            const objectFromUserReservationsOnPickedDate = Object.fromEntries(userReservationsOnPickedDate?.entries() ?? []);

            //set data in database
            tableReservationRef.set(objectFromTableScheduleEntries);
            userReservationsRef.set(objectFromUserReservationsOnPickedDate);
            message.success(t('book.bookedSuccessfully'));
        } else {
            message.error(t('book.alreadyBooked'));
        }
    };

    return bookTable;
}