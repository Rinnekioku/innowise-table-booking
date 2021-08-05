import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderSC } from './styled';

export function Header(): JSX.Element{
    const { t } = useTranslation();
    return (
        <HeaderSC>
            <h1>{t('header.title')}</h1>
        </HeaderSC>
    );
}