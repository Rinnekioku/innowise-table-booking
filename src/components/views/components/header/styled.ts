import styled from 'styled-components';
import { Colors } from '../../../../core/constants/colors';

interface HeaderSCProps {
    fontSize: number,
}

export const HeaderSC = styled('header')<HeaderSCProps>`
    display: flex;
    flex-direction: inline;
    justify-content: space-between;
    background: ${Colors.InnowiseRed};
    color: ${Colors.InnowiseWhite};
    font-size: ${({ fontSize }) => fontSize}rem;
    padding: 1rem;
    h1 {
        color: ${Colors.InnowiseWhite}; 
    }
`;