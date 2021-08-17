import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { useEffect } from 'react';
import { RootState } from '../../redux';
import { OfficeStateEntity } from '../../redux/reducers/offices';
import { TFunction } from 'i18next';
import { OfficesReducerActions } from '../../redux/reducers/offices/actions';
import { RoomsReducerActions } from '../../redux/reducers/rooms/actions';
import { TablesReducerActions } from '../../redux/reducers/tables/actions';

export function useOffices(): [OfficeStateEntity, TFunction]{
    const officesState = useSelector((state: RootState) => state.offices);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        const officesPath = 'offices/';
        const officesRef = db.ref(officesPath);
        officesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            dispatch({type: OfficesReducerActions.sagaLoad ,payload:data});
            dispatch({type: RoomsReducerActions.sagaDrop});
            dispatch({type: TablesReducerActions.sagaDrop});
        });

        return () => {
            officesRef.off('value');
        };
    }, [dispatch]);

    return [officesState, t];
}
