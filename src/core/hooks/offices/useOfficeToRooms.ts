import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export function useOfficeToRooms(name: string): () => void {
    const history = useHistory();
    const location = useLocation();

    const goToOffice = useCallback(() => {
        const clearDoubleSlash = /[/][/]/;
        history.push(`${location.pathname}/${name}/rooms`.replace(clearDoubleSlash, '/').toLocaleLowerCase());
    }, [location, history, name]);

    return goToOffice;
}
