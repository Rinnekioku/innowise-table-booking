import { Form, message } from 'antd';
import { RoomEntity } from '../../../components/rooms/components/room';
import { TableEntity } from '../../../components/tables/components/table';
import { db } from '../../firebase';
import { chunk } from 'lodash';
import { itemsOnPage } from '../../constants/itemsOnPage';
import { OfficeEntity } from '../../../components/offices';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { FormInstance } from 'antd';
import { fillRestOfWeek } from '../../constants/dates';

export function useCreateOffice(setVisible: Dispatch<SetStateAction<boolean> >): [TFunction, FormInstance<unknown>, () => Promise<void>, () => void] {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const onCancel = () => {
        setVisible(false);
    };

    const setOfficeInDB = async (officeName: string) => {
        const officesPath = 'offices/';
        const officesRef = db.ref(officesPath);
        const officesSnapshot = await officesRef.get();
        const officesFromDB = officesSnapshot.val() ? officesSnapshot.val().flat(Infinity) : [];
        const newOfficeId = `${Date.now()}`;
        const newOffice: OfficeEntity = {
            id: newOfficeId,
            name: officeName,
        };
        officesFromDB.push(newOffice);

        const newOffices = chunk(officesFromDB, itemsOnPage);
        const totalOffices = officesFromDB.length;
        const totalOfficesPath = '/totalOffices';
        const totalOfficesRef = db.ref(totalOfficesPath);

        await officesRef.set(newOffices);
        await totalOfficesRef.set(totalOffices);
    };

    const setRoomsInDB = async (roomsInOffice: RoomEntity[], officeNameKey: string, numberOfRooms: number) => {
        const newRooms= chunk(roomsInOffice, itemsOnPage);
        const newRoomsPathInDB = `rooms/${officeNameKey}/`;
        const newRoomsRef = db.ref(newRoomsPathInDB);
        const totalRoomsPath = `/rooms/${officeNameKey}/${officeNameKey}TotalRooms`;
        const totalRoomsRef = db.ref(totalRoomsPath);

        await newRoomsRef.set(newRooms);
        await totalRoomsRef.set(numberOfRooms);
    };

    const setTablesInDB = async (roomsInOffice: RoomEntity[], officeNameKey: string, numberOfTables: number) => {
        const newTablesPathInDB = `tables/${officeNameKey}/`;
        const newTables = roomsInOffice.reduce((acc: {[key: string]: TableEntity[][]}, room: RoomEntity): {[key: string]: TableEntity[][]} => {
            const tables = Array.from(
                {length: numberOfTables},
                (_, index: number) => ({
                    id: `table${index}${room.id}`,
                    name: `${index + 1}`
                })
            );
            const tablesToPageWithTables = chunk(tables, itemsOnPage);
            
            return {
                ...acc,
                [room.id]: tablesToPageWithTables,
            };
        }, {} as { [key: string]: TableEntity[][]});
        const newTablesRef = db.ref(newTablesPathInDB);
        const totalTablesInRoomPath = `/tables/${officeNameKey}/${officeNameKey}TotalTables`;
        const totalTablesInRoomRef = db.ref(totalTablesInRoomPath);

        await newTablesRef.set(newTables);
        await totalTablesInRoomRef.set(numberOfTables);
    };

    const setReservationsInDB = async (roomsInOffice: RoomEntity[], officeNameKey: string, numberOfTables: number) => {
        const newReservationsPath = `reservation/${officeNameKey}`;
        const newReservations = roomsInOffice.reduce((acc: {[key: string]: string[]}, room: RoomEntity): {[key: string]: string[]} => {
            const reservations = Object.fromEntries(Array.from(
                {length: numberOfTables},
                (_, index: number) => [`table${index}${room.id}`, Object.fromEntries(fillRestOfWeek())]
            ).values());
            
            return {
                ...acc,
                [room.id]: reservations
            };
        }, {} as {[key: string]: string[]});
        const newReservationsRef = db.ref(newReservationsPath);

        await newReservationsRef.set(newReservations);
    };

    const createOffice = async () => {
        
        const officeName = form.getFieldValue(['office']);
        const numberOfRooms = form.getFieldValue(['rooms_n']);
        const numberOfTables = form.getFieldValue(['tables_n']);

        if (officeName && numberOfRooms && numberOfTables){
            try {
                const officeNameKey = officeName.toLowerCase();
                const roomsInOffice: RoomEntity[] = Array.from(
                    {length: numberOfRooms},
                    (_, index: number): RoomEntity => ({
                        id:`room${index}${officeNameKey}`,
                        name: `${index + 1}`
                    })
                );

                setOfficeInDB(officeName);
                setRoomsInDB(roomsInOffice, officeNameKey, numberOfRooms);
                setTablesInDB(roomsInOffice, officeNameKey, numberOfTables);
                setReservationsInDB(roomsInOffice, officeNameKey, numberOfTables);
                setVisible(false);
            } catch (e) {
                message.error(e.message);
            }
            message.success(t('admin.successMessage'));
        } else {
            message.error(t('admin.errors.noEmptyFields'));
        }
    };

    return [t, form, createOffice, onCancel];
}
