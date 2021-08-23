import React, { useCallback } from 'react';
import { Avatar, Dropdown, Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { avatarSize } from '../../core/constants/avatarSettings';
import { useHistory } from 'react-router-dom';
import { ContentLinks } from '../../core/routes';
import { UpdateProfilePicture } from './components/updateProfilePicture';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux';
import { auth, storage } from '../../core/firebase';
import { useTranslation } from 'react-i18next';
import { AdminModal } from './components/adminModal';

export function Profile(): JSX.Element {
    const history = useHistory();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const { t } = useTranslation();
    const [adminModalVisible, setAdminModalVisible] = useState<boolean>(false);
    const [avatarURL, setAvatarURL] = useState<string>('');
    const admins = process.env.REACT_APP_FIRST_ADMIN_UID;
    
    const viewReservations = () => {
        history.push(ContentLinks.userReservations);
    };

    const updateAvatarURL = useCallback(() => {
        const imagePath = `images/${userId}.png`;
        const imageRef = storage.ref(imagePath);

        imageRef.getDownloadURL().then((url: string) => {
            setAvatarURL(url);
        });
    }, [userId]);

    const signOut = () => {
        auth.signOut();
    };

    useEffect(() => {
        updateAvatarURL();
    }, [updateAvatarURL]);

    const avatarMenu = () => {
        return (
            <Menu>
                <Menu.Item key={1}>
                    <Button onClick={viewReservations}>
                        {t('reservations.view')}
                    </Button>
                </Menu.Item>
                <Menu.Item key={2}>
                    <UpdateProfilePicture
                        updateAvatarURL={updateAvatarURL}
                    />
                </Menu.Item>
                {auth.currentUser?.uid === admins ? (<Menu.Item key={3}>
                    <Button onClick={() => {setAdminModalVisible(true);}}>
                        Create office
                    </Button>
                    <AdminModal
                        visible={adminModalVisible}
                        setVisible={setAdminModalVisible}
                    />
                </Menu.Item>) : null}
                <Menu.Item key={4}>
                    <Button onClick={signOut}>
                        {t('auth.signOut')}
                    </Button>
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <Dropdown overlay={avatarMenu} trigger={['click']}>
            <Avatar size={avatarSize} icon={<UserOutlined/>} src={avatarURL}/>
        </Dropdown>
    );
}
