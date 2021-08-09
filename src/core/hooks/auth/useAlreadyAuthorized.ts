import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../redux';

export function useAlreadyAuthorized(): void {
    const user = useSelector((state: RootState) => state.auth.user);
    const history = useHistory();

    useEffect(() => {
        if (user.isLoggedIn){
            history.push('/offices');
        }
    });
}
