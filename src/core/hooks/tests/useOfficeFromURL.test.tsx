import React from 'react';
import { render, screen } from '@testing-library/react';
import { createLocation, createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { FC } from 'react';
import { useOfficeFromURL } from '../dataFromURL/useOfficeFromURL';

const OfficeNameTestFC: FC = () => {
    const pathname = '/offices/minsk/rooms/';
    const location = createLocation(pathname);
    const history = createMemoryHistory();
    const getOfficeName = useOfficeFromURL(location);
    const officeName = getOfficeName();

    return (
        <Router history={history}>
            <div data-testid='office-name'>{officeName}</div>    
        </Router>
    );
};

test('test room id from url hook', () => {
    const officeMatchRegExp = new RegExp('minsk');

    render(
        <OfficeNameTestFC/>
    );

    expect(screen.getByTestId('office-name').textContent).toMatch(officeMatchRegExp);
});