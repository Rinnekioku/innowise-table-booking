import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../core/redux';

export function PasswordField(props: FormFieldEntity): JSX.Element {
    return (
        <Form.Item
            name={props.name}
            rules={props.rules}
            hasFeedback={props.hasFeedback}
        >
            <Input.Password
                placeholder={props.placeholder}
            />
        </Form.Item>
    );
}
