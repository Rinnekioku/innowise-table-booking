import { render, screen } from '@testing-library/react';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { TablesBreadcrumb } from '../../core/routes/tables';
import i18n from 'i18next';
import i18next from '../../core/i18next';

test('Breadcrumb render test', () => {
    i18next('en');
    const lastBreadcrumb = TablesBreadcrumb[TablesBreadcrumb.length - 1];
    const lastBreadcrumbName = i18n.t(lastBreadcrumb.breadcrumbName);
    const lastBreadcrumbRegExp = new RegExp(lastBreadcrumbName);
    
    render(
        renderBreadcrumb(lastBreadcrumb, Object(), TablesBreadcrumb)
    );

    expect(screen.getByText(lastBreadcrumbName).textContent).toMatch(lastBreadcrumbRegExp);
});
