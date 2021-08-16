import { useCallback } from 'react';
import { Location } from 'history';

export function useRoomIdFromURL(location: Location): () => string{
    const getRoomIdFromURL = useCallback(() => {
        const URL = location.pathname;
        const roomIdPositionInURL = 4;
        return URL.split('/')[roomIdPositionInURL]; 
    }, [location]);

    return getRoomIdFromURL;
}
