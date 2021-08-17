import { ReservationEntity } from '../../components/reservations';

export const reservationToString = (item: ReservationEntity): string => `${item.office}/${item.room}/${item.table}/${item.date}/${item.timeInterval}`;
