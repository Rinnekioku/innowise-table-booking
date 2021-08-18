import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { RootState } from '../../redux';
import { TFunction } from 'i18next';
import { useLocation } from 'react-router-dom';
import { RoomsStateEntity } from '../../redux/reducers/rooms';
import { useOfficeFromURL } from '../dataFromURL/useOfficeFromURL';
import { RoomsReducerActions } from '../../redux/reducers/rooms/actions';
import { TablesReducerActions } from '../../redux/reducers/tables/actions';
import { usePagination } from '../pagination/usePagination';

export function useRooms(): [RoomsStateEntity, TFunction, number, (newPage: number) => void, number]{
    const roomsState = useSelector((state: RootState) => state.rooms);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const getOfficeFromURL = useOfficeFromURL(location);
    const [page, onPageChange, total, setTotal] = usePagination();

    useEffect(() => {
        const office = getOfficeFromURL();
        const totalRoomsPath = `/rooms/${office}/${office}TotalRooms`;
        const roomsPath = `rooms/${office}/${page - 1}`;
        const roomsRef = db.ref(roomsPath);
        const totalRoomsRef = db.ref(totalRoomsPath);
        
        roomsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            dispatch({type: RoomsReducerActions.sagaLoad ,payload:data});
            dispatch({type: TablesReducerActions.sagaDrop});
        });

        totalRoomsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setTotal(data);
        });

        return () => {
            roomsRef.off('value');
        };
    }, [dispatch, getOfficeFromURL, page, setTotal]);

    return [roomsState, t, page, onPageChange, total];
}
