import React from 'react';
import { Row, Col, Checkbox, PageHeader, Menu } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../core/firebase';
import { UserReservationEntity } from '../../core/hooks/tables/useBookTable';
import { RootState } from '../../core/redux';
import { ReservationsReducerActions } from '../../core/redux/reducers/reservations/actions';
import { Reservation } from './components/reservation';
import { useState } from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxChangeEventTarget } from 'antd/lib/checkbox/Checkbox';
import { reservationsGutter, reservationSize } from '../../core/constants/reservationBlockSize';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { TableHeaderConfig } from '../../core/configs/reservations/tableHeader';
import { Loader } from '../../core/constants/loader';
import { ErrorBlock } from '../../core/constants/errorBlock';
import firebase from 'firebase';
import { availableTimeTag } from '../../core/constants/tableBookingTags';

export interface ReservationEntity {
    office: string,
    room: string,
    table: string,
    date: string,
    timeInterval: number,
}

export interface ReservationsPropsEntity {
    routes: Route[],
}

export function Reservations(props: ReservationsPropsEntity): JSX.Element {
    const reservationToString = (item: ReservationEntity) => `${item.office}/${item.room}/${item.table}/${item.date}/${item.timeInterval}`; 
    const userId = useSelector((state: RootState) => state.auth.userId);
    const userReservations = useSelector((state: RootState) => state.reservations);
    const [plainOptions, setPlainOptions] = useState<string[]>(
        userReservations.reservations.map((item: ReservationEntity) => {
            return reservationToString(item);
        })
    );
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const setPickedAvailable = async (ref: firebase.database.Reference, timeInterval: number) => {
        const snapshot = await ref.get();
        const data = await snapshot.val();

        const tableDataWithRemovedReservation = data.map((item: string, index: number) => {
            if (index === timeInterval) {
                return availableTimeTag;
            } else {
                return item;
            }
        });

        ref.set(tableDataWithRemovedReservation); 
    };

    const removeReservation = async (value: string) => {
        //table data
        const tableRegExp = /(.*)[/].*/;
        const formattedIndex = 1;
        const [date, timeInterval] = value.split('/').slice(-2);
        
        const afterRegExpArray = value.match(tableRegExp);
        const tablePath = afterRegExpArray ? `reservation/${afterRegExpArray[formattedIndex]}` : null;
        //user data
        const userPath = `/users/${userId}/${date}`;

        if (tablePath && userPath) {
            const tableRef = db.ref(tablePath);
            const userRef = db.ref(userPath);

            setPickedAvailable(tableRef, Number(timeInterval));
            setPickedAvailable(userRef, Number(timeInterval));
        }
    };

    const removeSelected = () => {
        console.log(checkedList);
        checkedList.forEach((item: CheckboxValueType) => {
            removeReservation(item as string);
        });
    };

    const getReserved = (reservations: [string, (string | UserReservationEntity)[]][]) => {
        const onlyReserved = reservations.reduce((acc: UserReservationEntity[], item: [string, (string | UserReservationEntity)[]]): UserReservationEntity[] => {
            const reservationsInDay = item[1];
            const date = item[0];
            const valid = reservationsInDay.reduce((acc: ReservationEntity[], item: (string | UserReservationEntity), index: number): ReservationEntity[] => {
                if (typeof item !== 'string') {
                    const reservation: ReservationEntity = {
                        ...item,
                        date: date,
                        timeInterval: index,
                    };
                    return [...acc, reservation];
                } else {
                    return acc;
                }
            }, []);
            return [...acc, ...valid];
        }, []);

        return onlyReserved;
    };

    useEffect(() => {
        const userReservationsPath = `users/${userId}`;
        const userReservationsRef = db.ref(userReservationsPath);

        userReservationsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const reserved = getReserved(Object.entries(data));
            dispatch({type: ReservationsReducerActions.sagaLoad, payload: reserved}); 
        });
    }, [dispatch, userId]);

    useEffect(() => {
        const plainOptions = userReservations.reservations.map((item: ReservationEntity) => {
            return reservationToString(item);
        });
    
        setPlainOptions(plainOptions);
    }, [userReservations.reservations]);

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        const eventTarget: CheckboxChangeEventTarget = e.target;
        setCheckedList(eventTarget.checked ? plainOptions : []);
        setCheckAll(eventTarget.checked);
    };
    if (userReservations.isLoading){
        return (
            <>
                <PageHeader
                    title={t('reservations.title')}
                    breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                />
                <Loader/>
            </>
        );
    } else {
        if (userReservations.error){
            return (
                <>
                    <PageHeader
                        title={t('reservations.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <ErrorBlock errorText={t('reservations.error')}/>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('reservations.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <Row>
                        {TableHeaderConfig(onCheckAllChange, checkAll, () => {removeSelected();})}
                    </Row>
                    <Checkbox.Group value={checkedList} onChange={onChange}>
                        <Row gutter={reservationsGutter} justify={'space-between'} wrap>
                            {userReservations.reservations.map((item: ReservationEntity, index: number) => {
                                const value = reservationToString(item);
                                return (
                                    <Col key={index} span={reservationSize}>
                                        <Reservation
                                            value={value}
                                            removeReservation={removeReservation}
                                            {...item}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Checkbox.Group>
                </>
            );
        }
    }
}
