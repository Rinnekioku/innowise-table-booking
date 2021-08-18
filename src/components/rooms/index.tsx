import React, { FormEvent } from 'react';
import { Row, Col, PageHeader } from 'antd';
import { Room } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useRooms } from '../../core/hooks/rooms';
import { RoomEntity } from './components/room';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { Loader } from '../../core/constants/loader';
import { blockMargin, blockSpan, errorAlign, loaderAlign } from '../../core/constants/gridSettings';
import { ErrorBlock } from '../../core/constants/errorBlock';
import { itemsOnPage } from '../../core/constants/itemsOnPage';
import { PaginationSC } from '../../core/styles/pagination';
import { SearchBar } from '../searchbar';
import { useState } from 'react';

interface RoomsPropsEntity{
    routes: Route[],
}

export function Rooms(props: RoomsPropsEntity): JSX.Element {
    const [roomsState, t, page, setPage, onPageChange, total] = useRooms();
    const [searchLine, setSearchLine] = useState<string>('');

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        if (e){
            const eventTarget = e.currentTarget;
            const value = Number(eventTarget.value);
            if (value <= total) {
                const pageNumber = Math.ceil(value / itemsOnPage);
                setPage(pageNumber === 0 ? 1 : pageNumber);
                setSearchLine(`${value}`);
            }
        }
    };

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
                        <Col span={24}>
                            <SearchBar onChange={onChange} type='rooms'/>
                        </Col>
                        {roomsState.rooms.map((room: RoomEntity) => {
                            if (searchLine !== ''){
                                if (room.name.match(searchLine.trim())) {
                                    return (
                                        <Col span={blockSpan} key={room.id}>
                                            <Room
                                                name={room.name} 
                                                id={room.id}
                                            />
                                        </Col>
                                    );
                                } else {
                                    return null;
                                }
                            } else {
                                return (
                                    <Col span={blockSpan} key={room.id}>
                                        <Room
                                            name={room.name} 
                                            id={room.id}
                                        />
                                    </Col>
                                ); 
                            }
                            
                        })}
                    </Row>
                    
                    <Row justify={'center'} align={'bottom'}>
                        <PaginationSC
                            current={page}
                            defaultPageSize={itemsOnPage}
                            showSizeChanger={false}
                            onChange={onPageChange}
                            total={total}
                        />
                    </Row>
                </>
            );
        }
    }
}
