import { Colors } from '../../../../core/constants/colors';
import styled from 'styled-components';

export const HeaderSC = styled.header`
    display: flex;
    flex-direction: inline;
    justify-content: space-between;
    background: ${Colors.InnowiseRed};
    color: ${Colors.InnowiseWhite};
    font-size: 1.25rem;
    padding: 1rem;
    h1 {
        color: ${Colors.InnowiseWhite}; 
    }`;