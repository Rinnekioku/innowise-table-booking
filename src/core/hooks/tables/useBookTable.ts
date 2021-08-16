import { message } from 'antd';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { TableDataContext } from '../../../components/tables/components/reducer';
import { emptyReservations } from '../../constants/dates';
import { availableTimeTag } from '../../constants/tableBookingTags';
import { db } from '../../firebase';
import { RootState } from '../../redux';
import { useTranslation } from 'react-i18next';
import { getTablePathInDB } from '../../constants/getTablePathInDB';
import { TableEntity } from '../../../components/tables/components/table';
import { useLocation } from 'react-router-dom';
import { useOfficeFromURL } from '../dataFromURL/useOfficeFromURL';
import { useRoomIdFromURL } from '../dataFromURL/useRoomIdFromURL';

export interface UserReservationEntity {
    office: string,
    room: string,
    table: string,
}

export function useBookTable(table: TableEntity): () => void {
    const userId: string = useSelector((state: RootState) => state.auth.userId);
    const location = useLocation();
    const { t } = useTranslation();
    const [tableState, ] = useContext(TableDataContext);
    const getOfficeFromURL = useOfficeFromURL(location);
    const getRoomIdFromURL = useRoomIdFromURL(location);

    const bookTable = async () => {
        const tablePath = getTablePathInDB(location.pathname, table.id);
        const tableReservationRef = db.ref(tablePath);
        const userReservationsPath = `users/${userId}/${tableState.date}`;
        const userReservationsRef = db.ref(userReservationsPath);
        const office = getOfficeFromURL();
        const roomId = getRoomIdFromURL();

        const userDataSnapshot = await userReservationsRef.get();
        const userData = userDataSnapshot.val();
        const ableToBook = userData ? userData[tableState.timeInterval] === availableTimeTag : true;
        
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
            const userReservationsOnPickedDate = userData ? 
                userData.map((item: string | UserReservationEntity, index: number) => {
                    if (index === tableState.timeInterval) {
                        return {
                            office: office,
                            room: roomId,
                            table: table.id,
                        };
                    } else {
                        return item;
                    }
                }) :
                tableScheduleWithBookedTable.get(tableState.date)?.map((item: string, index: number) => {
                    if (index === tableState.timeInterval) {
                        return {
                            office: office,
                            room: roomId,
                            table: table.id,
                        };
                    } else {
                        return item;
                    } 
                });
            const objectFromTableScheduleEntries = Object.fromEntries(tableScheduleWithBookedTable.entries());

            //set data in database
            tableReservationRef.set(objectFromTableScheduleEntries);
            userReservationsRef.set(userReservationsOnPickedDate);
            message.success(t('book.bookedSuccessfully'));
        } else {
            message.error(t('book.alreadyBooked'));
        }
    };

    return bookTable;
}