import { TFunction } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

export function usePlaceToPlace(path: string): [() => void, TFunction] {
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();

    const goToPlace = useCallback(() => {
        const clearDoubleSlash = /[/][/]/;
        const finishPath = `${location.pathname}/${path}`.replace(clearDoubleSlash, '/').toLocaleLowerCase();
        history.push(finishPath);
    }, [history, location, path]);

    return [goToPlace, t];
}