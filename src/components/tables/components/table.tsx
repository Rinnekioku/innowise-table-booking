import React from 'react';
import { Card, Button } from 'antd';
import { useTable } from '../../../core/hooks/tables/useTable';
import { BookTableModal } from './bookTableModal';

export interface TableEntity {
    id: string,
    name: string
}

export interface TablePropsEntity {
    table: TableEntity,
}

export function Table(props: TablePropsEntity): JSX.Element {
    const [t, visible, setVisible, showModal] = useTable(props.table);
    return(
        <>
            <Card title={props.table.name}>
                <Button onClick={showModal}>
                    {t('tables.bookTable')}
                </Button>
            </Card>

            <BookTableModal
                table={props.table}
                visible={visible}
                setVisible={setVisible}
            />
        </>
    );
}
