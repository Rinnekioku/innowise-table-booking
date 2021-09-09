import { ReservationEntity } from '../../components/reservations';
import { reservationToString } from '../../core/constants/reservationToString';

test('Reservation to string test', () => {
    const reservation: ReservationEntity = {
        office: 'minsk',
        room: 'room1',
        table: 'table1',
        date: '2021-9-11',
        timeInterval: 0,
    };
    const reservationStingMatchRegExp = new RegExp('minsk/room1/table1/2021-9-11/0');
    const reservationString = reservationToString(reservation);

    expect(reservationString).toMatch(reservationStingMatchRegExp);
});
