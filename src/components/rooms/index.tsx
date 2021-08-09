import React from 'react';
import { Space, PageHeader } from 'antd';
import { Room } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useRooms } from '../../core/hooks/rooms';
import { RoomEntity } from './components/room';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';

interface RoomsPropsEntity{
    routes: Route[],
}

export function Rooms(props: RoomsPropsEntity): JSX.Element {
    const [roomsState, t] = useRooms();   

    if (!roomsState.isLoaded) {
        return (
            <>
                <PageHeader
                    title={t('rooms.title')}
                    breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                />
                <p>{t('rooms.loadingRooms')}</p>
            </>
        );
    } else {
        if (roomsState.error) {
            return (
                <>
                    <PageHeader
                        title={t('rooms.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <p>{t('rooms.noRoomsError')}</p>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('rooms.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <Space>
                        {roomsState.rooms.map((room: RoomEntity) => {
                            return (
                                <Room
                                    key={room.id}
                                    id={room.id}
                                />
                            );
                        })}
                    </Space>
                </>
            );
        }
    }
}
