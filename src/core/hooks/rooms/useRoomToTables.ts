import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export function useRoomToTables(id: string): () => void {
    const history = useHistory();
    const location = useLocation();

    const goToRoom = useCallback(() => {
        const clearDoubleSlash = /[/][/]/;
        history.push(`${location.pathname}/${id}/tables`.replace(clearDoubleSlash, '/').toLocaleLowerCase());
    }, [location, history, id]);

    return goToRoom;
}
