import React from 'react';
import { useRoomIdFromURL } from '../dataFromURL/useRoomIdFromURL';
import { render, screen } from '@testing-library/react';
import { createLocation, createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { FC } from 'react';

const RoomIdTestFC: FC = () => {
    const pathname = '/offices/minsk/rooms/room1minsk/tables';
    const location = createLocation(pathname);
    const history = createMemoryHistory();
    const getRoomIdFromURL = useRoomIdFromURL(location);
    const roomId = getRoomIdFromURL();

    return (
        <Router history={history}>
            <div data-testid='room-id'>{roomId}</div>    
        </Router>
    );
};

test('test room id from url hook', () => {
    const roomMatchRegExp = new RegExp('room1minsk');

    render(
        <RoomIdTestFC/>
    );

    expect(screen.getByTestId('room-id').textContent).toMatch(roomMatchRegExp);
});
