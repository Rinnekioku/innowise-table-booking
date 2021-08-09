import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { RootState } from '../../redux';
import { TFunction } from 'i18next';
import { useLocation } from 'react-router-dom';
import { RoomsStateEntity } from '../../redux/reducers/rooms';
import { loadRoomsAction } from '../../redux/actions/rooms';
import { useOfficeFromURL } from '../dataFromURL/useOfficeFromURL';

export function useRooms(): [RoomsStateEntity, TFunction]{
    const roomsState = useSelector((state: RootState) => state.rooms);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const getOfficeFromURL = useOfficeFromURL(location);

    useEffect(() => {
        const office = getOfficeFromURL();
        const roomsPath = `rooms/${office}`;
        const roomsRef = db.ref(roomsPath);
        roomsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            dispatch(loadRoomsAction(data));
        });
    }, [dispatch, getOfficeFromURL]);

    return [roomsState, t];
}
