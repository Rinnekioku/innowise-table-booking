import { availableTimeTag } from './tableBookingTags';

export const daysInWeek = 7;
export const charactersToReplaceInDate = '-0';
export const replacerCharacterInDate = '-';
export const dividerCharacterInDate = '-';
export const emptyReservations = new Array(4).fill(availableTimeTag);

export function dateToString(date: Date): string{
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}

export function fillRestOfWeek (date: Date = new Date(), deficientlyQuantity = daysInWeek): (string | string[])[][]{
    
    const result = Array.from({length: deficientlyQuantity}, (_, index) => {
        const day = new Date();
        day.setDate(date.getDate() + (index + 1));
        return [dateToString(day), emptyReservations];
    });

    return result;
}
