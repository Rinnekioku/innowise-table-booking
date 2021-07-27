import styled from "styled-components";
import {Form, Input, Button} from "antd";

export const FormSC = styled(Form)`
    .ant-input-password:focus{
        border: none !important;
        box-shadow: none !important;
    }
    .ant-input:focus {
        box-shadow: 0 0 0 2px rgba(192, 47, 47, 0.5);
    }
    .ant-input-affix-wrapper-focused{
        box-shadow: 0 0 0 2px rgba(192, 47, 47, 0.5) !important;
    }
    .ant-form-item-has-error :not(.ant-input-disabled).ant-input,
    .ant-form-item-has-error :not(.ant-input-affix-wrapper-disabled).ant-input-affix-wrapper,
    .ant-form-item-has-error :not(.ant-input-disabled).ant-input:hover,
    .ant-form-item-has-error :not(.ant-input-affix-wrapper-disabled).ant-input-affix-wrapper:hover{
        input {
            box-shadow: none !important;
        }
    }
    
    .ant-form-item-has-error :not(.ant-input-disabled).ant-input:focus,
    .ant-form-item-has-error :not(.ant-input-affix-wrapper-disabled).ant-input-affix-wrapper:focus,
    .ant-form-item-has-error :not(.ant-input-disabled).ant-input-focused,
    .ant-form-item-has-error :not(.ant-input-affix-wrapper-disabled).ant-input-affix-wrapper-focused{
        box-shadow: 0 0 0 2px rgba(192, 47, 47, 0.5);
    }
    
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.3);
    text-align: right;
    padding: 2rem 2rem 0.2rem;
    margin: 5rem 5rem;`;

export const ItemSC = styled(Form.Item)`
    `;

export const TextInputSC = styled(Input)`
    background: transparent !important;
    .ant-input:focus {
        box-shadow: none !important;
    }
    border: none;
    border-radius: 10px;`;

export const PasswordInputSC = styled(Input.Password)`
    background: transparent !important;
    border: none;
    border-radius: 10px;`;

export const SubmitButtonSC = styled(Button)`
    background: #C02F2F;
    border: none;
    border-radius: 10px;
    padding: 0.25rem;
    color: #EDF6ED;
    font-weight: bold;
    padding-bottom: 1rem;
    box-shadow: 0 3px #B02F2F;
    transition: all 0.3s;
    
    :hover{
        transform: translateY(1px);
        box-shadow: 0 3px #A02F2F;
    }
    :active{
        background: #B22B2B;
        transform: translateY(1px);
        box-shadow: 0 1px #A02F2F;
        color: #EDF6ED;
    }
    &:hover, &:focus {
        color: #EDF6ED !important;
        background: #C02F2F !important;
    }`;


export const UploadButtonSC = styled(Button)`
    background: transparent;
    color: #c02f2f;
    border-radius: 10px;
    transition: all 0.5s ease-out;
    &:hover, &:focus, &:active{
        border-color: #d9d9d9;
        color: #EDF6ED;
        background: #c02f2f;
    }`;
