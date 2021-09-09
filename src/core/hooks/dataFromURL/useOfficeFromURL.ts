import { useCallback } from 'react';
import { Location } from 'history';

export function useOfficeFromURL(location: Location): () => string {
    const getOfficeFromURL = useCallback(() => {
        const URL = location.pathname;
        const officePositionInURL = 2;
        return URL.split('/')[officePositionInURL]; 
    }, [location]);

    return getOfficeFromURL;
}