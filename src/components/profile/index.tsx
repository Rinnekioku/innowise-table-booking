import React from 'react';
import { Avatar, Dropdown, Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { avatarSize } from '../../core/constants/avatarSettings';
import { useHistory } from 'react-router-dom';
import { ContentLinks } from '../../core/routes';

export function Profile(): JSX.Element {
    const history = useHistory();
    
    const viewReservations = () => {
        history.push(ContentLinks.userReservations);
    };

    const avatarMenu = () => {
        return (
            <Menu>
                <Menu.Item key={1}>
                    <Button onClick={viewReservations}>
                        View reservations
                    </Button>
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <Dropdown overlay={avatarMenu} trigger={['click']}>
            <Avatar size={avatarSize} icon={<UserOutlined/>}/>
        </Dropdown>
    );
}
