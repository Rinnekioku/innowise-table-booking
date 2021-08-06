import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

export function renderBreadcrumb(route: Route, params: typeof Object, routes: Route[]): JSX.Element {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={route.path}>{route.breadcrumbName}</Link>
    );
}
