import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../redux';
import { AuthLinks } from '../routes';
import { RouteProps } from 'react-router-dom';

interface PrivateRoutePropsEntity extends RouteProps{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>,
}

export function PrivateRoute({children: Children,  ...rest}: PrivateRoutePropsEntity): JSX.Element {
    const user = useSelector((state: RootState) => state.auth.user);
    return(
        <Route 
            {...rest} 
            render={() => (
                user.isLoggedIn ? Children : <Redirect to={AuthLinks.signIn}/>
            )}
        />
    );
}
