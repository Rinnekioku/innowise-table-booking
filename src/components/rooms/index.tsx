import React from 'react';
import { Row, Col, PageHeader } from 'antd';
import { Room } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useRooms } from '../../core/hooks/rooms';
import { RoomEntity } from './components/room';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { Loader } from '../../core/constants/loader';
import { blockMargin, blockSpan, errorAlign, loaderAlign } from '../../core/constants/gridSettings';
import { ErrorBlock } from '../../core/constants/errorBlock';

interface RoomsPropsEntity{
    routes: Route[],
}

export function Rooms(props: RoomsPropsEntity): JSX.Element {
    const [roomsState, t] = useRooms();   

    if (roomsState.isLoading) {
        return (
            <>
                <PageHeader
                    title={t('rooms.title')}
                    breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                />
                <Row justify={loaderAlign}>
                    <Loader/>
                </Row>
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
                    <Row justify={errorAlign}>
                        <ErrorBlock errorText={t('rooms.noRoomsError')}/>
                    </Row>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('rooms.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <Row gutter={blockMargin}>
                        {roomsState.rooms.map((room: RoomEntity) => {
                            return (
                                <Col span={blockSpan} key={room.id}>
                                    <Room
                                        
                                        id={room.id}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </>
            );
        }
    }
}
