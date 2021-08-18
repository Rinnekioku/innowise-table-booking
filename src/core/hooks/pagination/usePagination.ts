import { Dispatch, SetStateAction, useState } from 'react';
import { itemsOnPage } from '../../constants/itemsOnPage';

export function usePagination(): [number, Dispatch<SetStateAction<number> >, (newPage: number) => void, number, Dispatch<SetStateAction<number>>] {
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(itemsOnPage);    
    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    return [page, setPage, onPageChange, total, setTotal];
}