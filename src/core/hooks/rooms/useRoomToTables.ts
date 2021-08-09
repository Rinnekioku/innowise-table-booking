import { TFunction } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

export function useRoomToTables(id: string): [() => void, TFunction] {
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();

    const goToRoom = useCallback(() => {
        const clearDoubleSlash = /[/][/]/;
        history.push(`${location.pathname}/${id}/tables`.replace(clearDoubleSlash, '/').toLocaleLowerCase());
    }, [location, history, id]);

    return [goToRoom, t];
}
