import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { useCallback, useEffect } from 'react';
import { RootState } from '../../redux';
import { TFunction } from 'i18next';
import { useLocation } from 'react-router-dom';
import { RoomsStateEntity } from '../../redux/reducers/rooms';
import { loadRoomsAction } from '../../redux/actions/rooms';

export function useRooms(): [RoomsStateEntity, TFunction]{
    const roomsState = useSelector((state: RootState) => state.rooms);
    const location = useLocation();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const getOfficeFromURL = useCallback(() => {
        const URL = location.pathname;
        const officePositionInURL = 2;
        return URL.split('/')[officePositionInURL]; 
    }, [location]);

    useEffect(() => {
        const office = getOfficeFromURL();
        const roomsRef = db.ref(`rooms/${office}`);
        roomsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            dispatch(loadRoomsAction(data));
        });
    }, [dispatch, location, getOfficeFromURL]);

    return [roomsState, t];
}
