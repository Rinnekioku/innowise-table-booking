import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ContentLinks } from '../routes';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

export interface PublicRoutePropsEntity extends RouteProps{
    restricted: boolean,
}

export function PublicRoute({children, restricted,  ...rest}: PublicRoutePropsEntity): JSX.Element {
    const user = useSelector((state: RootState) => state.auth.user);
    return(
        <Route 
            {...rest} 
            render={() => (
                user.isLoggedIn && restricted ? <Redirect to={ContentLinks.offices}/> : children
            )}
        />
    );
}