import { useState, useEffect, useReducer, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { RootState } from '../../redux';
import { TFunction } from 'i18next';
import { useLocation } from 'react-router-dom';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useOfficeFromURL } from '../dataFromURL/useOfficeFromURL';
import { useRoomIdFromURL } from '../dataFromURL/useRoomIdFromURL';
import { TablesReducerActions } from '../../redux/reducers/tables/actions';
import { initialTableDataContextState, TableDataContextEntity, tableDataContextReducer } from '../../../components/tables/components/reducer';
import { TableActionType } from '../../../components/tables/components/actions';
import { TablesStateEntity } from '../../redux/reducers/tables';

export function useTables(routesTemplate: Route[]): [TablesStateEntity, TFunction, Route[], TableDataContextEntity, Dispatch<TableActionType>]{
    const tables = useSelector((state: RootState) => state.tables);
    const location = useLocation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [routes, setRoutes] = useState<Route[]>(routesTemplate);
    const [tableState, tableDispatch] = useReducer(tableDataContextReducer, initialTableDataContextState);
    const getOfficeFromURL = useOfficeFromURL(location);
    const getRoomIdFromURL = useRoomIdFromURL(location);

    useEffect(() => {
        const office = getOfficeFromURL();
        const room = getRoomIdFromURL();
        const tablesPath = `tables/${office}/${room}`;
        const tablesRef = db.ref(tablesPath);
        tablesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            dispatch({type: TablesReducerActions.sagaLoad ,payload: data});
        });
        return () => {
            tablesRef.off('value');
        };
    }, [dispatch, location, getOfficeFromURL, getRoomIdFromURL]);

    useEffect(() => {
        setRoutes(
            routesTemplate.map((item: Route): Route => {
                const officeTemplateReplacerRegExp = /[:][n][a][m][e]/;
                const roomTemplateReplacerRegExp = /[:][i][d]/;
                return {
                    path: item.path
                        .replace(officeTemplateReplacerRegExp, getOfficeFromURL())
                        .replace(roomTemplateReplacerRegExp, getRoomIdFromURL()),
                    breadcrumbName: item.breadcrumbName,
                };
            })
        );
    }, [routesTemplate, getOfficeFromURL, getRoomIdFromURL]);

    return [tables, t, routes, tableState, tableDispatch];
}
