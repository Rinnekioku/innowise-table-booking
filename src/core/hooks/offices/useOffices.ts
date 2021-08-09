import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { loadOfficesAction } from '../../redux/actions/offices';
import { useEffect } from 'react';
import { RootState } from '../../redux';
import { OfficeStateEntity } from '../../redux/reducers/offices';
import { TFunction } from 'i18next';

export function useOffices(): [OfficeStateEntity, TFunction]{
    const officesState = useSelector((state: RootState) => state.offices);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        const officesPath = 'offices/';
        const officesRef = db.ref(officesPath);
        officesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            dispatch(loadOfficesAction(data));
        });
    }, [dispatch]);

    return [officesState, t];
}
