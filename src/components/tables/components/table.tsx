import React from 'react';
import { Card, Button, Modal, DatePicker, Dropdown, Space, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTableModal } from '../../../core/hooks/tables/useTableModal';
import { db } from '../../../core/firebase';

export interface TableEntity {
    id: string,
}

export function Table(props: TableEntity): JSX.Element {
    const [t, showModal, visible, handleOk, handleCancel, enableSevenDaysOnly] = useTableModal();

    db.ref('/reservation/minsk/room0minsk/table0minsk/').on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });

    const menu = (): JSX.Element => {
        return (
            <Menu>
                <Menu.Item key={1}>
                    6.00-12.00
                </Menu.Item>
            </Menu>
        );
    };

    return(
        <>
            <Card>
                {props.id}<br/>
                <Button onClick={showModal}>
                    View room
                </Button>
            </Card>
            <Modal title={t('book.modalTitle')} visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <Space>
                    <DatePicker 
                        onChange={(date, dateString) =>{
                            console.log(date, dateString);
                        }} 
                        disabledDate={enableSevenDaysOnly}
                    />
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}> 
                            Click me <DownOutlined/>
                        </a>
                    </Dropdown>
                </Space>
            </Modal>
        </>
    );
}
