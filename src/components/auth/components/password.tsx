import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './';

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
