import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { useEffect} from 'react';
import { RootState } from '../../redux';
import { OfficeStateEntity } from '../../redux/reducers/offices';
import { TFunction } from 'i18next';
import { OfficesReducerActions } from '../../redux/reducers/offices/actions';
import { RoomsReducerActions } from '../../redux/reducers/rooms/actions';
import { TablesReducerActions } from '../../redux/reducers/tables/actions';
import { usePagination } from '../pagination/usePagination';

export function useOffices(): [OfficeStateEntity, TFunction, number, (newPage: number) => void, number]{
    const officesState = useSelector((state: RootState) => state.offices);
    const [page, onPageChange, total, setTotal] = usePagination();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        const officesPath = `offices/${page - 1}`;
        const totalOfficesPath = '/totalOffices';
        const officesRef = db.ref(officesPath);
        const totalOfficesRef = db.ref(totalOfficesPath);

        officesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            dispatch({type: OfficesReducerActions.sagaLoad ,payload:data});
            dispatch({type: RoomsReducerActions.sagaDrop});
            dispatch({type: TablesReducerActions.sagaDrop});
        });

        totalOfficesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setTotal(data);
        });

        return () => {
            officesRef.off('value');
        };
    }, [dispatch, page, setTotal]);

    return [officesState, t, page, onPageChange, total];
}
