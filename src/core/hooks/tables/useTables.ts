import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { useCallback, useEffect } from 'react';
import { RootState } from '../../redux';
import { TFunction } from 'i18next';
import { useLocation } from 'react-router-dom';
import { TablesStateEntity } from '../../redux/reducers/tables';
import { loadTablesAction } from '../../redux/actions/tables';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

export function useTables(routesTemplate: Route[]): [TablesStateEntity, TFunction, Route[]]{
    const tablesState = useSelector((state: RootState) => state.tables);
    const location = useLocation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [routes, setRoutes] = useState<Route[]>(routesTemplate);

    const getOfficeFromURL = useCallback(() => {
        const URL = location.pathname;
        const officePositionInURL = 2;
        return URL.split('/')[officePositionInURL]; 
    }, [location]);

    const getRoomIdFromURL = useCallback(() => {
        const URL = location.pathname;
        const roomIdPositionInURL = 4;
        return URL.split('/')[roomIdPositionInURL]; 
    }, [location]);

    useEffect(() => {
        const office = getOfficeFromURL();
        const room = getRoomIdFromURL();
        const tablesRef = db.ref(`tables/${office}/${room}`);
        tablesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            dispatch(loadTablesAction(data));
        });
    }, [dispatch, location, getOfficeFromURL, getRoomIdFromURL]);

    useEffect(() => {
        setRoutes(
            routesTemplate.map((item: Route): Route => {
                return {
                    path: item.path.replace(new RegExp('[:][n][a][m][e]'), getOfficeFromURL()).replace(new RegExp('[:][i][d]'), getRoomIdFromURL()),
                    breadcrumbName: item.breadcrumbName,
                };
            })
        );
    }, [routesTemplate, getOfficeFromURL, getRoomIdFromURL]);

    return [tablesState, t, routes];
}
