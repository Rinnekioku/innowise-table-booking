import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../core/redux';
import { Profile } from '../../../profile';
import { HeaderSC } from './styled';

export function Header(): JSX.Element{
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.auth);

    return (
        <HeaderSC>
            <h1>{t('header.title')}</h1>
            {user.isLoggedIn ? <Profile/> : null}
        </HeaderSC>
    );
}