import React from 'react';
import styled from 'styled-components';

const HeaderSC = styled.header`
    background: #C02F2F;
    color: #EDF6ED;
    font-size: 1.25rem;
    padding: 1rem;
    h1 {
        color: #EDF6ED; 
    }`;

export function Header(){
    return (
        <HeaderSC>
            <h1>Innowise</h1>
        </HeaderSC>
    );
}