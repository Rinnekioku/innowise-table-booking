import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { itemsOnPage } from '../../constants/itemsOnPage';

export const useSearchBar = (total: number, setPage: Dispatch<SetStateAction<number> >): [string, (e: FormEvent<HTMLInputElement>) => void] => {
    const [searchLine, setSearchLine] = useState<string>('');

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        if (e){
            const eventTarget = e.currentTarget;
            const value = eventTarget.value;
            const valueNumber = Number(value);
            if (valueNumber <= total) {
                const pageNumber = Math.ceil(valueNumber / itemsOnPage);
                setPage(pageNumber === 0 ? 1 : pageNumber);
                setSearchLine(`${value}`);
            } else if (value === '') {
                setPage(1);
                setSearchLine('');
            }
        }
    };

    return [searchLine, onChange];
};
