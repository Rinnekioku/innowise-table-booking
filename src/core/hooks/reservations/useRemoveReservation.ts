import { availableTimeTag } from '../../constants/tableBookingTags';
import { db } from '../../firebase';
import firebase from 'firebase';

export function useRemoveReservation(userId: string): (value: string) => Promise<void> {
    const setPickedAvailable = async (ref: firebase.database.Reference, timeInterval: number) => {
        const snapshot = await ref.get();
        const data = await snapshot.val();

        const tableDataWithRemovedReservation = data.map((item: string, index: number) => {
            if (index === timeInterval) {
                return availableTimeTag;
            } else {
                return item;
            }
        });

        ref.set(tableDataWithRemovedReservation); 
    };

    const removeReservation = async (value: string) => {
        //table data
        console.log('Args', value);
        const tableRegExp = /(.*)[/].*/;
        const formattedIndex = 1;
        const [date, timeInterval] = value.split('/').slice(-2);
        
        const afterRegExpArray = value.match(tableRegExp);
        const tablePath = afterRegExpArray ? `reservation/${afterRegExpArray[formattedIndex]}` : null;
        //user data
        const userPath = `/users/${userId}/${date}`;

        if (tablePath && userPath) {
            const tableRef = db.ref(tablePath);
            const userRef = db.ref(userPath);

            await setPickedAvailable(tableRef, Number(timeInterval));
            await setPickedAvailable(userRef, Number(timeInterval));
        }
    };

    return removeReservation;
}