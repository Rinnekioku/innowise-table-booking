import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { loadOfficesAction } from '../../redux/actions/offices';
import { useEffect } from 'react';
import { RootState } from '../../redux';
import { OfficeEntity } from '../../../components/offices';
import { OfficeStateEntity } from '../../redux/reducers/offices';
import { TFunction } from 'i18next';

export function useOffices(): [OfficeStateEntity, TFunction]{
    const officesState = useSelector((state: RootState) => state.offices);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        const officesRef = db.ref('offices/');
        officesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            dispatch(loadOfficesAction(data.filter( (item: OfficeEntity) => item !== null)));
        });
    }, [dispatch]);

    return [officesState, t];
}
