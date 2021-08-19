import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import i18n from 'i18next';

export function renderBreadcrumb(route: Route, props: typeof Object,routes: Route[]): JSX.Element {
    const lastBreadcrumb = routes.indexOf(route) === routes.length - 1;
    return lastBreadcrumb ? (
        <span>{i18n.t(route.breadcrumbName)}</span>
    ) : (
        <Link to={route.path}>{i18n.t(route.breadcrumbName)}</Link>
    );
}
