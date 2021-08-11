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
    const auth = useSelector((state: RootState) => state.auth);
    return(
        <Route 
            {...rest} 
            render={() => (
                auth.isLoggedIn && restricted ? <Redirect to={ContentLinks.offices}/> : children
            )}
        />
    );
}