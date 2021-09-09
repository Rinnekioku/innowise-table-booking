import styled from 'styled-components';
import { Form } from 'antd';

enum FromColors {
    shadowColor = 'rgba(0, 0, 0, 0.3)'
}

export const FormSC = styled(Form)`
    border: none;
    border-radius: 15px;
    box-shadow: 1rem 1rem 3rem 1rem ${FromColors.shadowColor};
    text-align: center;
    padding: 2rem 2rem 0.2rem;
    margin: 5rem 5rem;`;
