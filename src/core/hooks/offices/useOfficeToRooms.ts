import { TFunction } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

export function useOfficeToRooms(name: string): [() => void, TFunction] {
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();

    const goToOffice = useCallback(() => {
        const clearDoubleSlash = /[/][/]/;
        history.push(`${location.pathname}/${name}/rooms`.replace(clearDoubleSlash, '/').toLocaleLowerCase());
    }, [location, history, name]);

    return [goToOffice, t];
}
