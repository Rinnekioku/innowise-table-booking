import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../redux';

export function useAlreadyAuthorized(): void {
    const auth = useSelector((state: RootState) => state.auth);
    const history = useHistory();

    useEffect(() => {
        if (auth.isLoggedIn){
            history.push('/offices');
        }
    });
}
