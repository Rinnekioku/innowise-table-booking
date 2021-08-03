import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const HeaderSC = styled.header`
    background: #C02F2F;
    color: #EDF6ED;
    font-size: 1.25rem;
    padding: 1rem;
    h1 {
        color: #EDF6ED; 
    }`;

export function Header(): JSX.Element{
    const { t } = useTranslation();
    return (
        <HeaderSC>
            <h1>{t('header.title')}</h1>
        </HeaderSC>
    );
}
