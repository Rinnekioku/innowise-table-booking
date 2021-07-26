import styled from "styled-components";
import {Form, Input, Button} from "antd";

export const FormSC = styled(Form)`
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.3);
    text-align: center;
    padding: 0.2 rem 1 rem`;

export const ItemSC = styled(Form.Item)`
    `;

export const TextInputSC = styled(Input)`
    border: none;
    border-radius: 10px;
    :active {
        outline-color: red;
    }`;

export const PasswordInputSC = styled(Input.Password)`
    border: none;
    border-radius: 10px;`;

export const ButtonSC = styled(Button)`
    background: #C02F2F;
    border: none;
    border-radius: 10px;
    padding: 0.25rem;
    box-shadow: 5px 0 3 3 rgba`;
