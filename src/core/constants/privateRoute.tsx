import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthLinks } from '../routes';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

export function PrivateRoute({children,  ...rest}: RouteProps): JSX.Element {
    const auth = useSelector((state: RootState) => state.auth);
    return(
        <Route 
            {...rest} 
            render={() => (
                auth.isLoggedIn ? children : <Redirect to={AuthLinks.signIn}/>
            )}
        />
    );
}
