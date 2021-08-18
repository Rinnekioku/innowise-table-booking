import React, { SetStateAction } from 'react';
import { Modal, Form, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Dispatch } from 'react';
import { CreateOfficeConfig } from '../../../core/configs/forms/createOffice';
import { AdminFormSC } from './styled';
import { db } from '../../../core/firebase';
import chunk from 'lodash.chunk';
import { itemsOnPage } from '../../../core/constants/itemsOnPage';
import { RoomEntity } from '../../rooms/components/room';
import { fillRestOfWeek } from '../../../core/constants/dates';

interface AdminModalProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean> >,
}

export function AdminModal(props: AdminModalProps): JSX.Element {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const { visible, setVisible } = props;

    const onCancel = () => {
        setVisible(false);
    };

    const createOffice = async () => {
        
        const officeName = form.getFieldValue(['office']);
        const numberOfRooms = form.getFieldValue(['rooms_n']);
        const numberOfTables = form.getFieldValue(['tables_n']);

        if (officeName && numberOfRooms && numberOfTables){
            try {
                const officeNameKey = officeName.toLowerCase();

                const officesPath = 'offices/';
                const officesRef = db.ref(officesPath);
                const officesSnapshot = await officesRef.get();
                const officesFromDB = officesSnapshot.val() ? officesSnapshot.val().flat(Infinity) : [];
                const newOfficeId = `${Date.now()}`;
                const newOffice = {
                    id: newOfficeId,
                    name: officeName,
                };
                officesFromDB.push(newOffice);

                const newOffices = chunk(officesFromDB, itemsOnPage);
                const totalOffices = officesFromDB.length;
                
                const roomsInOffice = Array.from(
                    {length: numberOfRooms},
                    (_, index: number): RoomEntity => ({
                        id:`room${index}${officeNameKey}`,
                    })
                );
                const newRooms= chunk(roomsInOffice, itemsOnPage);
                const newRoomsPathInDB = `rooms/${officeNameKey}/`;
                
                const newTablesPathInDB = `tables/${officeNameKey}/`;
                const newTables = roomsInOffice.reduce((acc, room: RoomEntity) => {
                    const tables = Array.from(
                        {length: numberOfTables},
                        (_, index: number) => ({
                            id: `table${index}${room.id}`,
                        })
                    );
                    const tablesToPageWithTables = chunk(tables, itemsOnPage);
                    
                    return {
                        ...acc,
                        [room.id]: tablesToPageWithTables,
                    };
                }, {});

                const newReservationsPath = `reservation/${officeNameKey}`;
                const newReservations = roomsInOffice.reduce((acc, room: RoomEntity) => {
                    const reservations = Object.fromEntries(Array.from(
                        {length: numberOfTables},
                        (_, index: number) => [`table${index}${room.id}`, Object.fromEntries(fillRestOfWeek())]
                    ).values());
                    
                    return {
                        ...acc,
                        [room.id]: reservations
                    };
                }, {});

                const totalOfficesPath = '/totalOffices';
                const totalRoomsPath = `/rooms/${officeNameKey}/${officeNameKey}TotalRooms`;
                const totalTablesInRoomPath = `/tables/${officeNameKey}/${officeNameKey}TotalTables`;
                const totalOfficesRef = db.ref(totalOfficesPath);
                const totalRoomsRef = db.ref(totalRoomsPath);
                const totalTablesInRoomRef = db.ref(totalTablesInRoomPath);

                const newRoomsRef = db.ref(newRoomsPathInDB);
                const newTablesRef = db.ref(newTablesPathInDB);
                const newReservationsRef = db.ref(newReservationsPath);

                await officesRef.set(newOffices);
                await newRoomsRef.set(newRooms);
                await newTablesRef.set(newTables);
                await newReservationsRef.set(newReservations);
                await totalOfficesRef.set(totalOffices);
                await totalRoomsRef.set(numberOfRooms);
                await totalTablesInRoomRef.set(numberOfTables);
                setVisible(false);
            } catch (e) {
                message.error(e.message);
            }
            message.success(t('admin.successMessage'));
        } else {
            message.error(t('admin.noEmptyFieldsError'));
        }
    };

    return (
        <Modal 
            title={t('admin.modalTitle')}
            visible={visible}
            onCancel={onCancel}
            footer={[]}
        >
            <AdminFormSC 
                form={form}
                onSubmitCapture={createOffice}
            >
                {CreateOfficeConfig()} 
            </AdminFormSC>
        </Modal>
    );
}
